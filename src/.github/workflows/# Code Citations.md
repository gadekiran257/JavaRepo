# Code Citations

## License: MIT
https://github.com/viepovsky/PESEL/tree/5f32efd52f98fde565dcb7b12e9cdf663fad394e/.github/workflows/gradle.yml

```
JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'

    - name: Grant execute permission for gradlew
      run: chmod +x gradlew

    - name: Build with Gradle
      run: ./gradlew build

    - name: Run
```

