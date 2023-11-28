import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const settings = {
  isSplash: false, // show Splash screen or not
};

const quizPage = {
  quiz: {
    title: "Discover Your Style",
    description:
      "Whether you're a fan of modern, rustic, or industrial designs, Dream Home helps you identify your unique home style. Find the perfect house or homestay that reflects your taste.",
    quiz_image_path: "quizCover.jpg",
  },
};

export { settings, quizPage };
