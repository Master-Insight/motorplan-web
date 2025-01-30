import {GOOGLE_SHEETS_PRODUCTS_ID, SHEET_PRODUCTS_KEY} from "astro:env/server"
import { convertToJSON } from "@/lib/convert-to-json"

const collection = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_PRODUCTS_ID}/values/Productos?key=${SHEET_PRODUCTS_KEY}`)
const data = await collection.json()

export const products = convertToJSON(data.values)