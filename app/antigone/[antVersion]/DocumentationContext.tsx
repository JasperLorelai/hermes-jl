"use client";

import {createContext} from "react";

import {DocumentationFull} from "./Documentation";

const DocumentationContext = createContext<DocumentationFull | null>(null);

export default DocumentationContext;
