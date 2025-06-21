// src/types/express/index.d.ts

import { Document } from "mongoose";

import { Document, Types } from "mongoose";

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  username: string | null | undefined;
  email: string | null | undefined;
  password?: string | null; // if password is optional
}


declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
