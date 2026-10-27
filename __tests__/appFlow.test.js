import React from 'react';
import { Alert } from 'react-native';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from '../src/navigation/AppNavigator';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Peta (native module) diganti View biasa supaya bisa jalan di Jest
jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  const MockMap = (props) => <View {...props} />;
  return { __esModule: true, default: MockMap, Marker: MockMap };
});

async function login() {
  await render(<AppNavigator />);
  await fireEvent.press(screen.getByText('Masuk'));
  await screen.findByText('Jadwalkan perjalanan →');
}

describe('Alur aplikasi Anterin', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('Login: tahan tombol untuk intip password (onPressIn / onPressOut)', async () => {
    await render(<AppNavigator />);
    await fireEvent(screen.getByText('Tahan untuk lihat password'), 'pressIn');
    expect(screen.getByText('Lepas untuk menyembunyikan')).toBeTruthy();
    await fireEvent(screen.getByText('Lepas untuk menyembunyikan'), 'pressOut');
    expect(screen.getByText('Tahan untuk lihat password')).toBeTruthy();
  });

  it('Home: long press paket membuka modal, scroll memunculkan tombol ke atas', async () => {
    await login();
    await fireEvent(screen.getAllByText('Pilih paket  →')[0], 'longPress');
    expect(await screen.findByText('Booking paket ini')).toBeTruthy();
    await fireEvent.press(screen.getByText('Tutup'));

    await fireEvent.scroll(screen.getByText('Jadwalkan perjalanan →'), {
      nativeEvent: { contentOffset: { y: 900 } },
    });
    expect(screen.getByText('↑')).toBeTruthy();
  });

  it('Booking: progress bar naik saat form diisi, alert kalau form belum lengkap', async () => {
    await login();
    await fireEvent.press(screen.getByText('Jadwalkan perjalanan →'));
    expect(await screen.findByText('Form terisi 0%')).toBeTruthy();

    await fireEvent.press(screen.getByText('Review pesanan →'));
    expect(await screen.findByText('Form belum lengkap')).toBeTruthy();
    await fireEvent.press(screen.getByText('OK'));

    await fireEvent.changeText(screen.getByPlaceholderText('Nama Anda'), 'Budi');
    expect(await screen.findByText('Form terisi 20%')).toBeTruthy();
  });

  it('Status: long press kartu → konfirmasi → riwayat terhapus + notifikasi', async () => {
    await AsyncStorage.setItem(
      'anterin-history',
      JSON.stringify([
        {
          code: 'ANT-123456',
          packageName: 'Signature',
          name: 'Budi',
          date: '2050-01-01',
          time: '08:00',
          pickup: 'Stasiun Tawang',
          destination: 'Kota Lama',
          total: 1000000,
        },
      ]),
    );
    await login();
    await fireEvent.press(screen.getAllByText('Status')[0]);

    await fireEvent(await screen.findByText('ANT-123456'), 'longPress');
    expect(await screen.findByText('Hapus booking?')).toBeTruthy();
    await fireEvent.press(screen.getByText('Hapus'));

    expect(await screen.findByText('Belum ada riwayat')).toBeTruthy();
    expect(await screen.findByText('Riwayat diperbarui')).toBeTruthy();
  });

  it('Menu di Settings bisa pindah ke tab Status (nested navigation)', async () => {
    await login();
    await fireEvent.press(screen.getAllByLabelText('Buka menu navigasi')[0]);
    await fireEvent.press(screen.getAllByText('Pengaturan')[0]);
    await screen.findByText('Hubungi Admin');

    const menus = screen.getAllByLabelText('Buka menu navigasi');
    await fireEvent.press(menus[menus.length - 1]);
    const statusItems = screen.getAllByText('Status');
    await fireEvent.press(statusItems[statusItems.length - 1]);
    expect(await screen.findByText('Belum ada riwayat')).toBeTruthy();
  });

  it('Settings: tombol Keluar minta konfirmasi lalu reset ke Login', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    await login();
    await fireEvent.press(screen.getAllByLabelText('Buka menu navigasi')[0]);
    await fireEvent.press(screen.getAllByText('Pengaturan')[0]);
    await fireEvent.press(await screen.findByText('Keluar'));

    expect(alertSpy).toHaveBeenCalledWith(
      'Keluar dari akun?',
      expect.any(String),
      expect.any(Array),
    );
    const buttons = alertSpy.mock.calls[alertSpy.mock.calls.length - 1][2];
    await act(async () => buttons[1].onPress());
    expect(await screen.findByText('Tahan untuk lihat password')).toBeTruthy();
    alertSpy.mockRestore();
  });
});
