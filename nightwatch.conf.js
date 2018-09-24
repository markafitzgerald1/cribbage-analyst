var seleniumServerStandaloneJar = require('selenium-server-standalone-jar');

/* globals module */
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

module.exports = {
    src_folders: ['nightwatchSpec'],
    output_folder: 'e2e_tests_output',
    selenium: {
        start_process: true,
        server_path: `node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-${
            seleniumServerStandaloneJar.version
        }.jar`
    },
    test_settings: {
        default: {
            launch_url: 'http://localhost:8080/index.html',
            screenshots: {
                enabled: true,
                path: 'e2e_test_screenshots'
            },
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true,
                chromeOptions: {
                    args: ['--headless']
                }
            }
        }
    }
};
