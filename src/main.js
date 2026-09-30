/**
 * TaskFlow - Lógica do App & PWA
 */

// ==========================================
// 1. Constantes e Estado da Aplicação
// ==========================================
const STORAGE_KEY = 'taskflow_tasks_v1';

const INITIAL_TASKS = [
  {
    id: 'demo-1',
    title: 'Adicionar este app à tela de início do celular 📱',
    completed: false,
    priority: 'high',
    category: 'Estudo',
    createdAt: Date.now() - 3600000
  },
  {
    id: 'demo-2',
    title: 'Explorar o modo offline desconectando a internet ⚡',
    completed: false,
    priority: 'medium',
    category: 'Estudo',
    createdAt: Date.now() - 1800000
  },
  {
    id: 'demo-3',
    title: 'Completar uma tarefa para testar a barra de progresso ✨',
    completed: true,
    priority: 'low',
    category: 'Pessoal',
    createdAt: Date.now() - 600000
  }
];

let tasks = loadTasks();
let currentFilter = 'all';
let searchQuery = '';
let deferredInstallPrompt = null;

// ==========================================
// 2. Elementos DOM
// ==========================================
const currentDateEl = document.getElementById('current-date');
const progressSummaryEl = document.getElementById('progress-summary');
const progressPercentEl = document.getElementById('progress-percentage');
const progressFillEl = document.getElementById('progress-fill');
const searchInput = document.getElementById('search-input');
const btnClearSearch = document.getElementById('btn-clear-search');
const filterPills = document.querySelectorAll('.filter-pills .pill');
const tasksListEl = document.getElementById('tasks-list');
const emptyStateEl = document.getElementById('empty-state');
const emptyTitleEl = document.getElementById('empty-title');
const emptyDescEl = document.getElementById('empty-desc');

const countAllEl = document.getElementById('count-all');
const countPendingEl = document.getElementById('count-pending');
const countCompletedEl = document.getElementById('count-completed');

const btnOpenModal = document.getElementById('btn-open-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancelTask = document.getElementById('btn-cancel-task');
const modalBackdrop = document.getElementById('modal-backdrop');
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title-input');

const btnInstall = document.getElementById('btn-install');
const offlineIndicator = document.getElementById('offline-indicator');

// ==========================================
// 3. Inicialização e Registro PWA
// ==========================================
function init() {
  formatDateHeader();
  setupEventListeners();
  setupPWA();
  render();
}

function formatDateHeader() {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formatter = new Intl.DateTimeFormat('pt-BR', options);
  const formatted = formatter.format(new Date());
  currentDateEl.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function setupPWA() {
  // Registro do Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${import.meta.env.BASE_URL}sw.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then((reg) => {
          console.log('[PWA] Service Worker registrado com sucesso:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Falha ao registrar Service Worker:', err);
        });
    });
  }

  // Evento de instalação PWA (beforeinstallprompt)
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    btnInstall.classList.remove('hidden');
  });

  btnInstall.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;

    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    console.log('[PWA] Escolha do usuário para instalação:', outcome);
    deferredInstallPrompt = null;
    btnInstall.classList.add('hidden');
  });

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App instalado com sucesso');
    btnInstall.classList.add('hidden');
    deferredInstallPrompt = null;
  });

  // Detecção de status de rede (Online/Offline)
  function updateNetworkStatus() {
    if (navigator.onLine) {
      offlineIndicator.classList.add('hidden');
    } else {
      offlineIndicator.classList.remove('hidden');
    }
  }

  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
  updateNetworkStatus();
}

// ==========================================
// 4. Persistência de Dados
// ==========================================
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
      return INITIAL_TASKS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao ler localStorage:', e);
    return INITIAL_TASKS;
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Erro ao salvar no localStorage:', e);
  }
}

// ==========================================
// 5. Renderização & Atualização de UI
// ==========================================
function render() {
  updateProgressAndCounters();
  renderTasksList();
}

function updateProgressAndCounters() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  progressSummaryEl.textContent = `${completed} de ${total} tarefas`;
  progressPercentEl.textContent = `${percentage}%`;
  progressFillEl.style.width = `${percentage}%`;

  countAllEl.textContent = total;
  countPendingEl.textContent = pending;
  countCompletedEl.textContent = completed;
}

function getFilteredTasks() {
  return tasks.filter((task) => {
    // Filtro por status
    if (currentFilter === 'pending' && task.completed) return false;
    if (currentFilter === 'completed' && !task.completed) return false;

    // Filtro por busca
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchCategory = task.category.toLowerCase().includes(q);
      if (!matchTitle && !matchCategory) return false;
    }

    return true;
  });
}

function renderTasksList() {
  const filtered = getFilteredTasks();
  tasksListEl.innerHTML = '';

  if (filtered.length === 0) {
    emptyStateEl.classList.remove('hidden');
    if (searchQuery.trim() !== '') {
      emptyTitleEl.textContent = 'Nenhum resultado';
      emptyDescEl.textContent = `Nenhuma tarefa encontrada com o termo "${searchQuery}".`;
    } else if (currentFilter === 'completed') {
      emptyTitleEl.textContent = 'Sem tarefas concluídas';
      emptyDescEl.textContent = 'Conclua tarefas da sua lista para vê-las aqui.';
    } else if (currentFilter === 'pending') {
      emptyTitleEl.textContent = 'Tudo em dia! 🎉';
      emptyDescEl.textContent = 'Você não possui tarefas pendentes no momento.';
    } else {
      emptyTitleEl.textContent = 'Sua lista está vazia';
      emptyDescEl.textContent = 'Toque em "Nova Tarefa" abaixo para começar.';
    }
    return;
  }

  emptyStateEl.classList.add('hidden');

  filtered.forEach((task) => {
    const card = document.createElement('div');
    card.className = `task-card ${task.completed ? 'completed' : ''}`;
    card.dataset.id = task.id;

    const priorityLabel = task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa';

    card.innerHTML = `
      <label class="task-checkbox-wrapper" aria-label="Marcar como concluída">
        <input type="checkbox" ${task.completed ? 'checked' : ''} data-action="toggle">
        <span class="custom-checkbox">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      </label>

      <div class="task-content">
        <p class="task-title">${escapeHtml(task.title)}</p>
        <div class="task-meta">
          <span class="tag-category">${escapeHtml(task.category)}</span>
          <span class="tag-priority ${task.priority}">${priorityLabel}</span>
        </div>
      </div>

      <button class="btn-delete-task" data-action="delete" title="Excluir tarefa" aria-label="Excluir tarefa">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    `;

    tasksListEl.appendChild(card);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ==========================================
// 6. Manipulação de Tarefas (CRUD)
// ==========================================
function addTask(title, priority, category) {
  const newTask = {
    id: 'task-' + Date.now(),
    title: title.trim(),
    completed: false,
    priority: priority || 'low',
    category: category || 'Geral',
    createdAt: Date.now()
  };

  tasks.unshift(newTask);
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    render();
  }
}

function deleteTask(id) {
  const card = document.querySelector(`.task-card[data-id="${id}"]`);
  if (card) {
    card.style.transform = 'scale(0.92) translateX(20px)';
    card.style.opacity = '0';
    setTimeout(() => {
      tasks = tasks.filter((t) => t.id !== id);
      saveTasks();
      render();
    }, 180);
  } else {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    render();
  }
}

// ==========================================
// 7. Modal & Event Listeners
// ==========================================
function openModal() {
  modalBackdrop.classList.remove('hidden');
  setTimeout(() => {
    taskTitleInput.focus();
  }, 100);
}

function closeModal() {
  modalBackdrop.classList.add('hidden');
  taskForm.reset();
}

function setupEventListeners() {
  // Abertura e fechamento do modal
  btnOpenModal.addEventListener('click', openModal);
  btnCloseModal.addEventListener('click', closeModal);
  btnCancelTask.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalBackdrop.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Submissão do formulário
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskTitleInput.value;
    if (!title || !title.trim()) return;

    const priority = taskForm.elements['priority'].value;
    const category = taskForm.elements['category'].value;

    addTask(title, priority, category);
    closeModal();
  });

  // Ações na lista de tarefas (Delegação de eventos)
  tasksListEl.addEventListener('click', (e) => {
    const target = e.target;
    const actionEl = target.closest('[data-action]');
    if (!actionEl) return;

    const card = target.closest('.task-card');
    if (!card) return;
    const id = card.dataset.id;

    const action = actionEl.dataset.action;
    if (action === 'toggle') {
      toggleTask(id);
    } else if (action === 'delete') {
      deleteTask(id);
    }
  });

  // Filtros rápidos
  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.filter;
      render();
    });
  });

  // Campo de busca
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    if (searchQuery.length > 0) {
      btnClearSearch.classList.remove('hidden');
    } else {
      btnClearSearch.classList.add('hidden');
    }
    render();
  });

  btnClearSearch.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    btnClearSearch.classList.add('hidden');
    searchInput.focus();
    render();
  });
}

// Iniciar a aplicação
init();
