import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Страница не найдена — N2O Rostov";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-black gold-text">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Такой страницы нет</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          На главную
        </a>
      </div>
    </div>
  );
};

export default NotFound;
