FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/foo-talent-pet-0.0.1-SNAPSHOT.jar app.jar

ENV DB_URL $DB_URL
ENV DB_USERNAME $DB_USERNAME
ENV DB_PASSWORD $DB_PASSWORD
ENV JWT_SECRET $JWT_SECRET

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]