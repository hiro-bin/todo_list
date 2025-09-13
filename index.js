const listContainer = document.getElementById('list-container');
const todoInput = document.getElementById('todo-input');
const todoTemplate = document.querySelector('.todo-item');
const form = document.getElementById('todo-form');

// 추가 버튼 or Enter 누르면 리스트 생성
form.addEventListener('submit', (event) => {
    // input 필드가 form 태그 안에 있을 때 Enter 키 누르면 form을 제출하고 
    // 페이지를 새로고침하는 브라우저의 기본 동작이 존재
    // DB 사용하면 삭제해도 될듯
    event.preventDefault();
    createList();
});

listContainer.addEventListener('click', deleteOrCheck);

// 리스트 생성
// 중복 내용 추가 방지 기능 만들어도 재밌을듯
// input을 db에 저장해놓고 추가할 때마다 순회해서 탐색하고 겹치면 alert
function createList() {
    let input_value = todoInput.value;
    if(!input_value.trim()) {
        alert('할 일을 입력해주세요.');
        return;
    }
    const newList = todoTemplate.cloneNode(true);
    newList.querySelector('.todo-text').textContent = input_value;
    listContainer.append(newList);
    setTimeout(() => {
        newList.classList.remove('hidden', 'opacity-0', 'scale-95');
    }, 10);
    todoInput.value = '';
}

// 리스트 체크 or 리스트 삭제
function deleteOrCheck(event) {
    if(event.target.classList.contains('btn-delete')) {
        const liToDelete = event.target.closest('li');
        liToDelete.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            liToDelete.remove();
        }, 300);
        return;
    }
    if(event.target.classList.contains('todo-checkbox')) {
        const li = event.target.closest('li');
        const unCheckedIcon = li.querySelector('.fa-square');
        const checkedIcon = li.querySelector('.fa-square-check');
        const textSpan = li.querySelector('.todo-text');
        unCheckedIcon.classList.toggle('hidden');
        checkedIcon.classList.toggle('hidden');
        textSpan.classList.toggle('text-gray-500');
        textSpan.classList.toggle('decoration-gray-500');
        textSpan.classList.toggle('line-through');
    }
}