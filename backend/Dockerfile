FROM maven:3.9-eclipse-temurin-26 AS build
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn --batch-mode --no-transfer-progress -DskipTests package

FROM eclipse-temurin:26-jre
WORKDIR /app
COPY --from=build /app/target/boutique-api-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
