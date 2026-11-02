# NEURO ROAD 2050 포스터

[홈](../README.md) · [미래 프로젝트 기획](../week07.md) · [발표 안내](../presentation.md)

**사람을 위한 길을, 도시가 함께 만든다.**

군체 안전망, 자기부상, 주행 중 무선충전, 접이식 주차가 연결되는 2050년을 그립니다. 최종 발표에 사용할 포스터의 **현재 3차 초안**이며, 최종 제출 확정본은 아닙니다.

[![NEURO ROAD 2050 포스터 3차 초안 미리보기](../assets/neuro-road-2050/poster-preview.png)](NEURO_ROAD_2050_A0.pdf)

## 파일 보기

| 파일 | 용도 |
| --- | --- |
| [A0 PDF](NEURO_ROAD_2050_A0.pdf) | 발표·출력 확인용 1페이지 포스터 |
| [편집 가능한 SVG](NEURO_ROAD_2050_Editable.svg) | 글자·배치·연결선을 수정하는 원본 |
| [편집 패키지 ZIP](NEURO_ROAD_2050_Editable_Package.zip) | SVG, 원본 이미지, 폰트, 라이선스, 생성 프롬프트, 제작 기록 |
| [포스터 미리보기 PNG](../assets/neuro-road-2050/poster-preview.png) | 화면에서 빠르게 확인하는 이미지 |
| [미래 도시 일러스트 PNG](../assets/neuro-road-2050/city.png) | 중앙 장면의 생성 원본 |

## 출력 규격과 현재 한계

- **A0 세로 841 × 1,189mm / PDF 1페이지 / CMYK**입니다. 재단선과 도련은 없습니다.
- 글자와 연결선은 벡터이며, 사용 폰트와 CMYK 출력 프로파일을 PDF에 포함했습니다. 색상은 일반 SWOP 기준으로, 최종 출력소의 색상 조건을 확인해야 합니다.
- 도시 일러스트는 실제 배치 크기에서 **원본 약 60 DPI**를 **약 188 DPI로 보간**했습니다. 보간은 원본의 세부 정보를 늘리지 않으므로, 최종 인쇄 전 고해상도 원본 교체와 실물 출력 확인이 필요합니다.

## 편집 방법

ZIP을 풀고 패키지 안의 SVG를 편집 도구에서 엽니다. 한글은 **Pretendard**, 영문 제목과 숫자는 **Space Grotesk**를 사용했습니다. 글자 모양과 줄바꿈을 유지하려면 패키지에 포함된 폰트를 함께 사용해 주세요.

두 폰트의 SIL Open Font License와 출처는 패키지의 `source/assets/fonts/`에 있습니다. SVG에서 이미지는 개별 오브젝트로 배치되어 있으며, 이미지 내부의 건물·차량은 래스터 그림입니다.

## 권장 구성 반영

| 항목 | 포스터에서 확인할 곳 |
| --- | --- |
| ① 프로젝트 제목·팀 소개 | 상단 제목, 핵심 문장, 팀원 이름 |
| ② 미래의 문제와 사용자 | 「문제와 사용자」의 보행자 안전·이동자의 시간과 공간 |
| ③ 2040~2050년 미래 모습 | 현재·2050 비교와 중앙 아이소메트릭 도시 장면 |
| ④ 미래 기술과 작동 방식 | 공동 감각·자기부상·달리는 충전·접히는 주차 및 AI 작동 흐름 |
| ⑤ 실현 가능성과 예상 문제 | 현재의 근거, 2050의 과제, 위치 오차·통신·개인정보 문제 |
| ⑥ 미래 속 우리의 모습 | 이동 AI·보안·시뮬레이션·사용자 경험을 설계하는 미래 |
| ⑦ 참고자료와 AI 활용 | 포스터 하단 출처 및 아래 제작 기록 |

## 디자인 레퍼런스

- [Vinicius Valente — Isometric City](https://www.behance.net/gallery/41531361/Isometric-City): 입체 도시의 시점과 공간 구성 참고.
- [Dust — Electricity Smart Cities](https://www.behance.net/gallery/162727095/Electricity-Smart-Cities): 도시·에너지 기술을 연결하는 설명 방식 참고.

레퍼런스의 작품 이미지를 포스터에 그대로 삽입하지 않고, 별도의 미래 도시 장면을 제작했습니다.

## AI 활용 기록

ChatGPT로 아이디어 정리와 문구 초안을 다듬고, OpenAI 이미지 생성 도구로 미래 도시 일러스트와 배경을 제작·수정했습니다. 팀의 구상을 시각화한 이미지이며 실증된 시설이나 실제 국민대학교 캠퍼스 사진은 아닙니다. 한글 글자와 연결선은 별도 편집 요소로 배치했습니다.

현재 버전의 전체 프롬프트와 수정 기록은 [편집 패키지](NEURO_ROAD_2050_Editable_Package.zip)에 보관했습니다.

- `source/image-prompt-revision03-vehicles.txt`: 차량 형태와 색상 수정
- `source/image-prompt-revision03-background.txt`: 배경 효과 제작
- `source/revision03-notes.txt`: 3차 수정 사항과 출력 확인 기록
