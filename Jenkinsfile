pipeline {
    agent any

    environment {
        TEST_ENV = 'qa'
        HEADLESS = 'true'
        TIMEOUT = '30000'
        QA_URL = 'https://rahulshettyacademy.com/client/'
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/rponnam554/RahulShettyTests.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
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
                    bat 'npm run smoke'
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
                    bat 'npm run regression'
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
                    bat 'npm run web'
                }
            }
        }
    }

    post {

        // Runs regardless of SUCCESS / FAILURE / UNSTABLE
        always {
            echo 'Publishing test results...'

            // Archive screenshots, videos and traces
            archiveArtifacts(
                artifacts: 'test-results/**/*',
                allowEmptyArchive: true
            )

            // Archive Playwright HTML report
            archiveArtifacts(
                artifacts: 'playwright-report/**/*',
                allowEmptyArchive: true
            )

            // Publish Playwright HTML report
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }

        // Runs only when pipeline succeeds
        success {
            echo 'Automation passed successfully.'

            emailext(
                subject: "PASSED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Hello Team,

Playwright automation execution completed successfully.

Job         : ${env.JOB_NAME}
Build       : #${env.BUILD_NUMBER}
Environment : ${env.TEST_ENV}
Status      : PASSED

Build URL:
${env.BUILD_URL}

Regards,
Jenkins
""",
                to: 'qa-team@company.com'
            )
        }

        // Runs when pipeline fails
        failure {
            echo 'Automation failed.'

            emailext(
                subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Hello Team,

Playwright automation execution has FAILED.

Job         : ${env.JOB_NAME}
Build       : #${env.BUILD_NUMBER}
Environment : ${env.TEST_ENV}
Status      : FAILED

Please investigate the Jenkins build and Playwright report.

Build URL:
${env.BUILD_URL}

Regards,
Jenkins
""",
                to: 'qa-team@company.com'
            )
        }

        // Runs if Jenkins marks the build as UNSTABLE
        unstable {
            echo 'Automation completed but the build is unstable.'

            emailext(
                subject: "UNSTABLE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Hello Team,

Playwright automation completed with an UNSTABLE status.

Job         : ${env.JOB_NAME}
Build       : #${env.BUILD_NUMBER}
Environment : ${env.TEST_ENV}
Status      : UNSTABLE

Please check the Jenkins build and test report.

Build URL:
${env.BUILD_URL}

Regards,
Jenkins
""",
                to: 'raju.ponnam554@gmail.com'
            )
        }

        // Runs after all other post actions
        cleanup {
            echo 'Cleaning temporary files...'

            // Uncomment this if you want to delete the workspace
            // after reports/artifacts have been archived and published.
            //
            // cleanWs()
        }
    }
}