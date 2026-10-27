import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import SectionHeading from '../src/components/SectionHeading';
import { lightTheme, darkTheme } from '../src/theme/colors';
import typography from '../src/theme/typography';

describe('SectionHeading (styled-components)', () => {
  it('uses central typography values and theme colors', async () => {
    await render(
      <ThemeProvider theme={lightTheme}>
        <SectionHeading
          eyebrow="RIWAYAT PESANAN"
          title="Semua perjalanan,"
          highlight="tercatat rapi."
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('RIWAYAT PESANAN')).toHaveStyle({
      color: lightTheme.gold,
      fontSize: typography.eyebrow.fontSize,
    });
    expect(screen.getByText('tercatat rapi.')).toHaveStyle({
      color: lightTheme.gold,
    });
  });

  it('follows the dark theme from ThemeProvider', async () => {
    await render(
      <ThemeProvider theme={darkTheme}>
        <SectionHeading title="Booking" />
      </ThemeProvider>,
    );

    expect(screen.getByText('Booking')).toHaveStyle({ color: darkTheme.text });
  });
});
