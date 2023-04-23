import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// funkcja zapisuje czas odtwarzacza w local storage
const saveTimeLocalStorage = time => {
  localStorage.setItem('videoplayer-current-time', time);
};

// funkcja do odtwarzania czasu odtwarzania z local storage
const getTimeFromLocalStorage = () => {
  return localStorage.getItem('videoplayer-current-time');
};

// rejestracja zdarzenia timeupdate raz na sekundę
player.on(
  'timeupdate',
  throttle(() => {
    // pobieram aktualny czas odtwarzania
    player.getCurrentTime().then(time => {
      // zapisuję czas odtwarzania w local storage
      saveTimeLocalStorage(time);
    });
  }, 1000)
);

// po załadowaniu strony sprawdzam czy jest zapisany czas odtwarzania
// w local storage
const storedTime = getTimeFromLocalStorage();

// jeśli jest zapisany ustaw jako domyślny czas odtwarzania
if (storedTime !== null) {
  player.setCurrentTime(storedTime);
}
