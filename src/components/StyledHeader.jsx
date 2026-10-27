import React from "react";
import styled from "styled-components/native";
import typography from "../theme/typography";
import spacing from "../theme/spacing";

// Sesi 5 - Styled Components
export default function StyledHeader({ eyebrow, title }) {
  return (
    <Wrapper>
      {/* TODO: tampilkan eyebrow pakai <Eyebrow> dan title pakai <Title> */}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  margin-bottom: ${spacing.lg}px;
`;

// TODO: isi CSS-nya. Warna ambil dari theme: ${(props) => props.theme.gold}
// Ukuran ambil dari typography.eyebrow (fontSize, fontWeight, letterSpacing)
const Eyebrow = styled.Text``;

// TODO: sama seperti Eyebrow, tapi pakai props.theme.text dan typography.pageTitle
const Title = styled.Text``;
