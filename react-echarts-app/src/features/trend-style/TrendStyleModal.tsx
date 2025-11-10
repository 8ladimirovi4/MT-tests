import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { ColorPicker } from 'primereact/colorpicker';
import { Dropdown } from 'primereact/dropdown';

export interface TrendStyleSettings {
  color: string;
  thickness: number;
  style: 'solid' | 'dashed' | 'dotted';
}

interface TrendStyleModalProps {
  visible: boolean;
  onHide: () => void;
  initialSettings: TrendStyleSettings;
  onApply: (settings: TrendStyleSettings) => void;
}

const lineStyleOptions = [
  { label: 'Сплошная', value: 'solid' },
  { label: 'Пунктирная', value: 'dashed' },
  { label: 'Точечная', value: 'dotted' },
];

export const TrendStyleModal: React.FC<TrendStyleModalProps> = ({
  visible,
  onHide,
  initialSettings,
  onApply,
}) => {
  const [settings, setSettings] = useState<TrendStyleSettings>(initialSettings);

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings, visible]);

  const handleApply = () => {
    onApply(settings);
    onHide();
  };

  const handleColorChange = (event: any) => {
    // PrimeReact ColorPicker возвращает событие с value
    const color = event.value;
    let colorValue: string;
    if (typeof color === 'string') {
      colorValue = color.startsWith('#') ? color : `#${color}`;
    } else if (color?.hex) {
      colorValue = color.hex.startsWith('#') ? color.hex : `#${color.hex}`;
    } else {
      return; // Невалидное значение
    }
    setSettings((prev) => ({ ...prev, color: colorValue }));
  };

  const handleThicknessChange = (event: any) => {
    const value = event.value;
    if (value !== null && value !== undefined && value > 0) {
      setSettings((prev) => ({ ...prev, thickness: value }));
    }
  };

  const handleStyleChange = (value: 'solid' | 'dashed' | 'dotted') => {
    setSettings((prev) => ({ ...prev, style: value }));
  };

  return (
    <Dialog
      header="Настройки тренда"
      visible={visible}
      onHide={onHide}
      style={{ width: '400px' }}
      footer={
        <div>
          <Button label="Отмена" icon="pi pi-times" onClick={onHide} severity="secondary" />
          <Button label="Применить" icon="pi pi-check" onClick={handleApply} />
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="color">Цвет:</label>
          <ColorPicker
            value={settings.color}
            onChange={handleColorChange}
            format="hex"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="thickness">Толщина линии:</label>
          <InputNumber
            id="thickness"
            value={settings.thickness}
            onValueChange={handleThicknessChange}
            min={1}
            max={10}
            showButtons
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="style">Стиль линии:</label>
          <Dropdown
            id="style"
            value={settings.style}
            options={lineStyleOptions}
            onChange={(e) => handleStyleChange(e.value)}
            placeholder="Выберите стиль"
          />
        </div>
      </div>
    </Dialog>
  );
};

