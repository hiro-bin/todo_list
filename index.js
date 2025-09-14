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

listContainer.addEventListener('click', (event) => {
    const target = event.target;
    const actionTarget = target.closest('[data-action]');
    
    if(!actionTarget) return;
    
    const action = actionTarget.dataset.action;
    const todoItem = actionTarget.closest('.todo-item');

    switch(action) {
        case 'check':
            checkItem(todoItem); // 체크박스 클릭
            break;
        case 'text':
            openCloseSubText(todoItem); // 내용 클릭
            break;
        case 'delete':
            deleteItem(todoItem); // 삭제 버튼 클릭
            break;
    }
});

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

function checkItem(todoItem) {
    const unCheckedIcon = todoItem.querySelector('.fa-square');
    const checkedIcon = todoItem.querySelector('.fa-square-check');
    const textSummary = todoItem.querySelector('.todo-text');
    unCheckedIcon.classList.toggle('hidden');
    checkedIcon.classList.toggle('hidden');
    textSummary.classList.toggle('text-gray-500');
    textSummary.classList.toggle('decoration-gray-500');
    textSummary.classList.toggle('line-through');
}

function openCloseSubText(todoItem) {
    return;
}

function deleteItem(todoItem) {
    todoItem.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        todoItem.remove();
    }, 300);
}