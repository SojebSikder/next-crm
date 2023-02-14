import { io } from "socket.io-client";
import { AppConfig } from "../../config/app.config";

// initialize socket
export const socket = io(AppConfig().app.url);
