# pip install requests
# pip install sqlalchemy
# pip install psycopg2-binary
# pip install python-dotenv

import requests
import uuid
import os
from sqlalchemy import create_engine, Column, String, ForeignKey, exists
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import sessionmaker, relationship, declarative_base
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL_PY')
if not DATABASE_URL:
    raise ValueError("La variable de entorno DATABASE_URL no está definida")

URL_PROVINCES = "https://apis.datos.gob.ar/georef/api/provincias?campos=nombre"

response = requests.get(URL_PROVINCES)

if response.status_code != 200:
    print("Error: ", response.status_code)
    exit()
    
data = response.json()
provinces = data.get('provincias', [])

Base = declarative_base()

class Province(Base):
    __tablename__ = 'provinces'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, nullable=False)
    
class City(Base):
    __tablename__ = 'cities'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, nullable=False)
    province_id = Column(UUID(as_uuid=True), ForeignKey('provinces.id'), nullable=False)

class Locality(Base):
    __tablename__ = 'localities'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, nullable=False)
    city_id = Column(UUID(as_uuid=True), ForeignKey('cities.id'), nullable=False)
    
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

for provincia in provinces:
    name = provincia.get('nombre')
    if name:
        exists_query = session.query(exists().where(Province.name == name)).scalar()
        if not exists_query:
            new_province = Province(name=name)
            session.add(new_province)
            print(f"Insertando provincia: {name}")
        URL_CITIES = f"https://apis.datos.gob.ar/georef/api/departamentos?provincia={name}&campos=nombre"
        response = requests.get(URL_CITIES)
        if response.status_code != 200:
            print("Error: ", response.status_code)
            exit()
        data = response.json()
        cities = data.get('departamentos', [])
        for city in cities:
            city_name = city.get('nombre')
            if city_name:
                exists_query = session.query(exists().where(City.name == city_name)).scalar()
                if not exists_query:
                    province = session.query(Province).filter(Province.name == name).first()
                    if province:
                        new_city = City(name=city_name, province_id=province.id)
                        session.add(new_city)
                        print(f"Insertando ciudad: {city_name} en provincia: {name}")
                URL_LOCALITIES = f"https://apis.datos.gob.ar/georef/api/localidades?provincia={name}&departamento={city_name}&campos=nombre"
                response = requests.get(URL_LOCALITIES)
                if response.status_code != 200:
                    print("Error: ", response.status_code)
                    exit()
                data = response.json()
                localities = data.get('localidades', [])
                for locality in localities:
                    locality_name = locality.get('nombre')
                    if locality_name:
                        exists_query = session.query(exists().where(Locality.name == locality_name)).scalar()
                        if not exists_query:
                            city = session.query(City).filter(City.name == city_name).first()
                            if city:
                                new_locality = Locality(name=locality_name, city_id=city.id)
                                session.add(new_locality)
                                print(f"Insertando localidad: {locality_name} en ciudad: {city_name} en provincia: {name}")
            
session.commit()
session.close()