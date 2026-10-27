import React from "react";
import styled from "styled-components/native";
import typography from "../theme/typography";
import spacing from "../theme/spacing";

/**
 * Judul halaman (eyebrow + title) yang dipakai ulang di beberapa screen.
 * Sesi 5 (Styling): Styled Components — View dan Text "dibungkus" pakai
 * tagged template literal. Ukuran diambil dari file pusat (theme/typography.js
 * dan theme/spacing.js), warna dari ThemeProvider (theme/colors.js),
 * jadi tidak ada nilai yang di-hardcode dan tidak ada style yang diduplikasi.
 *
 * Props:
 *   eyebrow   — teks kecil emas di atas judul
 *   title     — judul baris pertama
 *   highlight — (opsional) baris kedua berwarna emas
 */
export default function SectionHeading({ eyebrow, title, highlight }) {
  return (
    <Wrapper>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Title>
        {title}
        {highlight ? <Highlight>{"\n" + highlight}</Highlight> : null}
      </Title>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  margin-bottom: ${spacing.xl}px;
`;

const Eyebrow = styled.Text`
  color: ${(props) => props.theme.gold};
  font-size: ${typography.eyebrow.fontSize}px;
  font-weight: ${typography.eyebrow.fontWeight};
  letter-spacing: ${typography.eyebrow.letterSpacing}px;
  margin-bottom: ${spacing.md}px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: ${typography.pageTitle.fontSize}px;
  line-height: ${typography.pageTitle.lineHeight}px;
  font-weight: ${typography.pageTitle.fontWeight};
  letter-spacing: ${typography.pageTitle.letterSpacing}px;
`;

const Highlight = styled.Text`
  color: ${(props) => props.theme.gold};
`;
