import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
// only load Aos on the client side (Angular Universal / Vercel SSR)
if (typeof window !== 'undefined') {
  // dynamic import keeps it out of the server bundle
  import('aos').then(({ default: AOS }) => {
    import('aos/dist/aos.css');
    AOS.init({
      duration: 900,
      once: true,
    });
  });
}


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
