import { writeFile, unlink } from "fs/promises";
import path from "path";
import { readMultipartFormData, defineEventHandler } from "h3";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import fs from "fs";
import { Buffer } from "buffer"; // Импортируем Buffer для ESM

// Получаем текущую директорию
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  const htmlPart = formData?.find((part) => part.name === "html");
  const emailPart = formData?.find((part) => part.name === "email");

  if (!htmlPart || !emailPart) {
    return { status: 400, message: "❌ Contenido HTML o email no encontrado" };
  }

  const htmlContent: string = htmlPart.data.toString();
  const userEmail: string = emailPart.data.toString();
  const filePath: string = path.join("uploads", "Azlogica ROI calculadora.pdf");

  try {
    const pdfBuffer = await generatePDF(htmlContent); // 🔥 Генерируем PDF
    await writeFile(filePath, pdfBuffer);

    // 📧 Настраиваем SMTP (Пароль должен храниться в переменных среды!)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.yandex.ru",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Mops Bullik" <mops.bullik@yandex.ru>',
      to: userEmail, // Используем email из формы
      subject: "📄 Azlogica ROI calculadora",
      text: "Buenos días, gracias por utilizar la calculadora de ROI de Azlogica. Puede familiarizarse con nuestros servicios y ponerse en contacto con nosotros en el sitio web: https://azlogica.com/",
      attachments: [
        {
          filename: "Azlogica ROI calculadora.pdf",
          content: Buffer.from(pdfBuffer), // ✅ Преобразуем Uint8Array в Buffer
          contentType: "application/pdf",
        },
      ],
    });

    console.log("✅ Correo con PDF enviado correctamente!");
    await unlink(filePath);

    return { status: 200, message: "✅ Archivo cargado y correo enviado exitosamente" };
  } catch (error) {
    console.error("❌ Error al generar el PDF:", error);
    return { status: 500, message: "❌ Error al enviar el correo" };
  }
});

/** 🔥 Función para generar PDF usando Puppeteer */
async function generatePDF(htmlContent: string): Promise<Buffer> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Читаем стили из файла
  const cssPath = path.resolve(__dirname, "../../assets/styles/pdfStyles.css");
  const styles = fs.readFileSync(cssPath, "utf-8");

  // Вставляем стили внутрь HTML
  const styledHtml = `
    <html>
      <head>
        <style>${styles}</style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

  console.log("🔹 HTML con estilos aplicado:", styledHtml);

  await page.setContent(styledHtml, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    displayHeaderFooter: false,
    preferCSSPageSize: true,
  });

  await browser.close();

  return Buffer.from(pdfBuffer);
}
