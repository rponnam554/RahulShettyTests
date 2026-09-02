pipeline {
    agent any

    environment {
        TEST_ENV = 'qa'
        HEADLESS = 'true'
        TIMEOUT = '30000'
        QA_URL = 'https://rahulshettyacademy.com/client/'
    }

    stages {

        // =========================================================
        // 1. CLEAN WORKSPACE
        // =========================================================
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        // =========================================================
        // 2. CHECKOUT CODE
        // =========================================================
        stage('Checkout') {
            steps {
                git(
                    branch: 'main',
                    url: 'https://github.com/rponnam554/RahulShettyTests.git'
                )
            }
        }

        // =========================================================
        // 3. INSTALL NODE DEPENDENCIES
        // =========================================================
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        // =========================================================
        // 4. INSTALL PLAYWRIGHT BROWSERS
        // =========================================================
        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        // =========================================================
        // 5. SMOKE TESTS
        //
        // If Smoke fails:
        // Jenkins stops here.
        // Regression and Web will NOT execute.
        // =========================================================
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
                        echo ========================================
                        echo Running Smoke Tests
                        echo Environment: %TEST_ENV%
                        echo Headless: %HEADLESS%
                        echo ========================================

                        npm run smoke
                    '''
                }
            }
        }

        // =========================================================
        // 6. REGRESSION TESTS
        //
        // Runs only if Smoke passes.
        //
        // If Regression fails:
        // Web Tests will NOT execute.
        // =========================================================
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
                        echo ========================================
                        echo Running Regression Tests
                        echo Environment: %TEST_ENV%
                        echo Headless: %HEADLESS%
                        echo ========================================

                        npm run regression
                    '''
                }
            }
        }

        // =========================================================
        // 7. WEB TESTS
        //
        // Runs only if Smoke + Regression pass.
        // =========================================================
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
                        echo ========================================
                        echo Running Web Tests
                        echo Environment: %TEST_ENV%
                        echo Headless: %HEADLESS%
                        echo ========================================

                        npm run web
                    '''
                }
            }
        }
    }

    // =============================================================
    // POST ACTIONS
    // =============================================================
    post {

        // ---------------------------------------------------------
        // ALWAYS
        // Runs whether SUCCESS / FAILURE / UNSTABLE
        // ---------------------------------------------------------
        always {

            echo '========================================'
            echo 'Publishing Playwright test results...'
            echo '========================================'

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

        // ---------------------------------------------------------
        // SUCCESS
        // ---------------------------------------------------------
        success {

            echo '========================================'
            echo 'Automation PASSED'
            echo '========================================'

            emailext(
                subject: "PASSED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",

                body: """
Hello Team,

Playwright automation execution completed successfully.

==============================
BUILD DETAILS
==============================

Job         : ${env.JOB_NAME}
Build       : #${env.BUILD_NUMBER}
Environment : ${env.TEST_ENV}
Status      : PASSED

==============================
REPORT
==============================

Playwright HTML Report:
${env.BUILD_URL}Playwright_20HTML_20Report/

Jenkins Build:
${env.BUILD_URL}

Regards,
Jenkins
""",

                to: 'raju.ponnam554@gmail.com'
            )
        }

        // ---------------------------------------------------------
        // FAILURE
        // ---------------------------------------------------------
        failure {

            echo '========================================'
            echo 'Automation FAILED'
            echo '========================================'

            emailext(
                subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",

                body: """
Hello Team,

Playwright automation execution has FAILED.

==============================
BUILD DETAILS
==============================

Job         : ${env.JOB_NAME}
Build       : #${env.BUILD_NUMBER}
Environment : ${env.TEST_ENV}
Status      : FAILED

==============================
ACTION REQUIRED
==============================

Please investigate the Jenkins build.

Playwright HTML Report:
${env.BUILD_URL}Playwright_20HTML_20Report/

Jenkins Build:
${env.BUILD_URL}

Screenshots, videos and traces are available in the build artifacts.

Regards,
Jenkins
""",

                to: 'raju.ponnam554@gmail.com'
            )
        }

        // ---------------------------------------------------------
        // UNSTABLE
        // ---------------------------------------------------------
        unstable {

            echo '========================================'
            echo 'Automation UNSTABLE'
            echo '========================================'

            emailext(
                subject: "UNSTABLE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",

                body: """
Hello Team,

Playwright automation completed with an UNSTABLE status.

==============================
BUILD DETAILS
==============================

Job         : ${env.JOB_NAME}
Build       : #${env.BUILD_NUMBER}
Environment : ${env.TEST_ENV}
Status      : UNSTABLE

Please check the Jenkins build and Playwright report.

Playwright HTML Report:
${env.BUILD_URL}Playwright_20HTML_20Report/

Jenkins Build:
${env.BUILD_URL}

Regards,
Jenkins
""",

                to: 'raju.ponnam554@gmail.com'
            )
        }

        // ---------------------------------------------------------
        // CLEANUP
        // ---------------------------------------------------------
        cleanup {

            echo '========================================'
            echo 'Cleanup completed'
            echo '========================================'

            // Don't use cleanWs() here if you want to inspect
            // files/artifacts directly from the workspace.
            //
            // Artifacts have already been archived above.
            //
            // cleanWs()
        }
    }
}