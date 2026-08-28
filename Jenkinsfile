pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/rponnam554/RahulShettyTests.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'qa-credentials',
                        usernameVariable: 'EMAIL',
                        passwordVariable: 'PASSWORD'
                    )
                ]) {
                    bat '''
                        set TEST_ENV=qa
                        set HEADLESS=true
                        set TIMEOUT=30000
                        npx playwright test
                    '''
                }
            }
        }
    }
}