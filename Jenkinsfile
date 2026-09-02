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

        stage('Smoke Tests') {
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
                        set QA_URL=https://rahulshettyacademy.com/client/
                        set HEADLESS=true
                        set TIMEOUT=30000
                        npm run smoke
                    '''
                }
            }
        }

        stage('Regression Tests') {
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
                        set QA_URL=https://rahulshettyacademy.com/client/
                        set HEADLESS=true
                        set TIMEOUT=30000
                        npm run regression
                    '''
                }
            }
        }

        stage('Web Tests') {
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
                        set QA_URL=https://rahulshettyacademy.com/client/
                        set HEADLESS=true
                        set TIMEOUT=30000
                        npm run web
                    '''
                }
            }
        }
    }
}