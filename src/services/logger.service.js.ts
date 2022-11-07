import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://dba1e6c41e9d4d93849f0be3d5d76c91@o1368986.ingest.sentry.io/4504044386385920",
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1.0,
    });
}

function log(error:any) {
    Sentry.captureException(error)
}

const loggerService = {
    init,
    log
}

export default loggerService