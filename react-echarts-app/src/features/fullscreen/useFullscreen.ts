import { useCallback, useEffect, useState } from 'react';
import type { ECharts } from 'echarts';

export const useFullscreen = (
  chartRef: React.RefObject<HTMLDivElement | null>,
  chartInstance: React.MutableRefObject<ECharts | null>
) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Проверяем, поддерживается ли Fullscreen API
  const isFullscreenSupported = useCallback(() => {
    return !!(
      document.fullscreenElement !== undefined ||
      (document as any).webkitFullscreenElement !== undefined ||
      (document as any).mozFullScreenElement !== undefined ||
      (document as any).msFullscreenElement !== undefined
    );
  }, []);

  // Запрос на вход в полноэкранный режим
  const enterFullscreen = useCallback(() => {
    if (!chartRef.current || !isFullscreenSupported()) return;

    const element = chartRef.current;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      // Chrome, Safari, Opera
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      // Firefox
      (element as any).mozRequestFullScreen();
    } else if ((element as any).msRequestFullscreen) {
      // IE/Edge
      (element as any).msRequestFullscreen();
    }
  }, [chartRef, isFullscreenSupported]);

  // Выход из полноэкранного режима
  const exitFullscreen = useCallback(() => {
    if (!isFullscreenSupported()) return;

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  }, [isFullscreenSupported]);

  // Переключение полноэкранного режима
  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  // Обработчик изменения состояния полноэкранного режима
  useEffect(() => {
    if (!isFullscreenSupported()) return;

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );

      setIsFullscreen(isCurrentlyFullscreen);

      // Перерисовываем график при изменении размера
      if (chartInstance.current) {
        // Небольшая задержка для корректного определения размеров
        setTimeout(() => {
          chartInstance.current?.resize();
        }, 100);
      }
    };

    // Слушаем события изменения полноэкранного режима для разных браузеров
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [chartInstance, isFullscreenSupported]);

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    isSupported: isFullscreenSupported(),
  };
};

