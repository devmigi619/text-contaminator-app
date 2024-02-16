document.addEventListener('DOMContentLoaded', () => {
  const textInput = document.getElementById('textInput');
  const transformedText = document.getElementById('transformedText');
  const historyBtn = document.getElementById('historyBtn');
  const transformFrequencySlider = document.getElementById('transformFrequency');
  const frequencyValueDisplay = document.getElementById('frequencyValue');
  let historyArray = [];
  let transformFrequency = transformFrequencySlider.value;
  const historyModal = document.getElementById('historyModal');
  const closeBtn = document.querySelector('.close-button');
  const settingsBtn = document.getElementById('settingsBtn');
  const sliderContainer = document.getElementById('sliderContainer');

  transformFrequencySlider.addEventListener('input', () => {
    transformFrequency = transformFrequencySlider.value;
    frequencyValueDisplay.textContent = `${transformFrequency}%`;
    // 입력 중인 텍스트에 대한 실시간 변환도 적용
    transformedText.innerHTML = transformText(textInput.value);
  });

  textInput.addEventListener('input', () => {
    const inputText = textInput.value;
    const transformed = transformText(inputText);
    transformedText.innerHTML = transformed;
    // 변환된 텍스트를 히스토리에 저장하지 않고, 실시간으로만 보여줌
  });

  // 텍스트 변환 함수
  function transformText(text) {
    // 정규 표현식을 사용하여 마침표, 물음표, 느낌표를 포함한 문장 구분
    const sentences = text.split(/(?<=[.?!])\s/);
    const transformedSentences = sentences.map(sentence => {
      if (!sentence.trim()) return sentence;
      return sentence.split(' ').map(word => {
        const randomTransform = Math.floor(Math.random() * 4);
        switch (randomTransform) {
          case 0: return `<i>${word}</i>`;
          case 1: return `<b>${word}</b>`;
          case 2:
            if (word.length > 1) {
              const spaceIndex = Math.floor(Math.random() * (word.length - 1));
              return `${word.substring(0, spaceIndex + 1)} ${word.substring(spaceIndex + 1)}`;
            }
            return word;
          case 3:
            const starIndex = Math.floor(Math.random() * word.length);
            return `${word.substring(0, starIndex)}*${word.substring(starIndex)}`;
          default: return word;
        }
      }).join(' ');
    }).join('<br>');
    return transformedSentences;
  }

  settingsBtn.addEventListener('click', () => {
    // 슬라이더 컨테이너의 표시 상태를 토글합니다.
    const isHidden = sliderContainer.style.display === 'none';
    sliderContainer.style.display = isHidden ? 'block' : 'none';
  });

  // History 버튼 클릭 이벤트
  historyBtn.addEventListener('click', () => {
    // History 모달의 display 상태를 토글합니다.
    const isHidden = historyModal.style.display === 'none' || !historyModal.style.display;
    historyModal.style.display = isHidden ? 'block' : 'none';
  });

  // 닫기 버튼 클릭 시 모달 숨김
  closeBtn.addEventListener('click', () => {
    historyModal.style.display = "none";
  });

  // 모달 외부 클릭 시 모달 숨김
  window.onclick = function (event) {
    if (event.target == historyModal) {
      historyModal.style.display = "none";
    }
  };
});
