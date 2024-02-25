require('dotenv').config();
import App from "./app/App";

const app = new App();

app.server.listen(process.env.PORT || 3000);