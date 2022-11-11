const path = require("path");
const dotenv = require("dotenv").config({
    path: path.join(__dirname, "./../.env"),
}).parsed;

function getEnvDev() {
    const allDotEnv = Object.keys(dotenv);
    const nameExposes = allDotEnv.filter((val) =>
        val?.includes("NAME_COMPONENT_EXPOSE")
    );
    const fileExposes = allDotEnv.filter((val) =>
        val?.includes("SRC_COMPONENT_EXPOSE")
    );
    let exposes = {};
    nameExposes.forEach((val, i) => {
        exposes[dotenv[val]] =
            dotenv.FRAMEWORK === "vue"
                ? `${dotenv[fileExposes[i]]}.vue`
                : dotenv[fileExposes[i]];
    });

    /* For get data remotes */
    const nameRemotes = allDotEnv.filter((val) => val?.includes("REMOTE_NAME"));
    const portRemotes = allDotEnv.filter((val) =>
        val?.includes("REMOTE_PORT_APP_DEV")
    );
    const endpointRemotes = allDotEnv.filter((val) =>
        val?.includes("REMOTE_ENDPOINT_DEV")
    );
    const fileRemotes = allDotEnv.filter((val) => val?.includes("REMOTE_FILE"));
    let remotes = {};
    nameRemotes.forEach((val, i) => {
        let name = dotenv[val];
        let endpoint = dotenv[endpointRemotes[i]];
        let port = dotenv[portRemotes[i]];
        let file = dotenv[fileRemotes[i]];
        remotes[dotenv[val]] = `${name}@${endpoint}:${port}/${file}`;
    });

    let config = {
        name: dotenv.APP_NAME,
        filename: dotenv.FILE_NAME,
        port: dotenv.PORT_APP_DEV,
        endpoint: dotenv?.PORT_APP_DEV
            ? `${dotenv.ENDPOINT_DEV}:${dotenv.PORT_APP_DEV}/`
            : `${dotenv.ENDPOINT_DEV}/`,
        exposes: exposes,
        remotes: remotes,
    };
    return config;
}

function getEnvProd() {
    const allDotEnv = Object.keys(dotenv);
    const nameExposes = allDotEnv.filter((val) =>
        val?.includes("NAME_COMPONENT_EXPOSE")
    );
    const fileExposes = allDotEnv.filter((val) =>
        val?.includes("SRC_COMPONENT_EXPOSE")
    );
    let exposes = {};
    nameExposes.forEach((val, i) => {
        exposes[dotenv[val]] =
            dotenv.FRAMEWORK === "vue"
                ? `${dotenv[fileExposes[i]]}.vue`
                : dotenv[fileExposes[i]];
    });

    /* For get data remotes */
    const nameRemotes = allDotEnv.filter((val) => val?.includes("REMOTE_NAME"));
    const portRemotes = allDotEnv.filter((val) =>
        val?.includes("REMOTE_PORT_APP_PROD")
    );
    const endpointRemotes = allDotEnv.filter((val) =>
        val?.includes("REMOTE_ENDPOINT_PROD")
    );
    const fileRemotes = allDotEnv.filter((val) => val?.includes("REMOTE_FILE"));
    let remotes = {};
    nameRemotes.forEach((val, i) => {
        let name = dotenv[val];
        let endpoint = dotenv[endpointRemotes[i]];
        let port = dotenv[portRemotes[i]];
        let file = dotenv[fileRemotes[i]];
        remotes[dotenv[val]] = `${name}@${endpoint}:${port}/${file}`;
    });

    let config = {
        name: dotenv.APP_NAME,
        filename: dotenv.FILE_NAME,
        port: dotenv.PORT_APP_PROD,
        endpoint: dotenv?.PORT_APP_PROD
            ? `${dotenv.ENDPOINT_PROD}:${dotenv.PORT_APP_PROD}/`
            : `${dotenv.ENDPOINT_PROD}/`,
        exposes: exposes,
        remotes: remotes,
    };
    return config;
}

module.exports = {
    getEnvDev,
    getEnvProd,
};
