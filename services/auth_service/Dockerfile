FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY .mvn .mvn
COPY mvnw mvnw
COPY pom.xml pom.xml
COPY src src
RUN chmod +x mvnw
RUN ./mvnw -q -DskipTests package
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "target/auth-0.0.1-SNAPSHOT.jar"]