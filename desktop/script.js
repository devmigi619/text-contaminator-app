document.addEventListener('DOMContentLoaded', () => {
  const textInput = document.getElementById('textInput');
  const transformedText = document.getElementById('transformedText');
  const transformBtn = document.getElementById('transformBtn');
  const historyBtn = document.getElementById('historyBtn');
  const transformFrequencySlider = document.getElementById('transformFrequency');
  const frequencyValueDisplay = document.getElementById('frequencyValue');
  let historyArray = [];
  let transformFrequency = transformFrequencySlider.value;
  const historyModal = document.getElementById('historyModal');
  const closeBtn = document.querySelector('.close-button');

  transformFrequencySlider.addEventListener('input', () => {
    transformFrequency = transformFrequencySlider.value;
    frequencyValueDisplay.textContent = `${transformFrequency}%`;
  });

  // 텍스트 변환 함수
  function transformText(text) {
    // 정규 표현식을 사용하여 마침표, 물음표, 느낌표를 포함한 문장 구분
    const sentences = text.split(/(?<=[.?!])\s/);
    const transformedSentences = sentences.map(sentence => {
      if (!sentence.trim()) return sentence; // 비어 있는 문장은 건너뜀
      // 단어별 변환 로직 적용 (변환 로직은 이전과 동일)
      const transformed = sentence.split(' ').map(word => {
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

      // 문장 끝 구분자 유지를 위해 반환 시 구분자 제거하지 않음
      return transformed;
    });

    // 문장마다 <br> 태그로 개행 추가하여 반환
    return transformedSentences.join('<br>');
  }


  // 변환 버튼 클릭 이벤트
  transformBtn.addEventListener('click', () => {
    const inputText = textInput.value;
    const transformed = transformText(inputText);
    transformedText.innerHTML = transformed; // 변환된 텍스트를 출력 영역에 표시
    historyArray.push({ original: inputText, transformed }); // 객체로 저장
  });

  // History 버튼 클릭 이벤트
  historyBtn.addEventListener('click', () => {
    const historyContent = document.getElementById('historyContent');
    historyContent.innerHTML = historyArray.map((item, index) =>
      `<div class="history-item">
          <div class="history-original"><strong>Original ${index + 1}:</strong><br>${item.original}</div>
          <div class="history-transformed"><strong>Contaminated:</strong><br>${item.transformed}</div>
       </div><hr>`
    ).join('');
    historyModal.style.display = "block";
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