import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";

export const useSessionStore = defineStore("session", () => {

  const { sessions, projects } = storeToRefs(useDataStore());
  
  const finishedSessions = computed(() => {
    return sessions.value.filter(session => session.is_running === '0');
  });

  const runningSession = computed(() => {
    return sessions.value.filter(session => session.is_running === '1');
  })

  const currentSession = ref({
    title: null,
    project_id: null,
    created_at: null,
    stopped_at: null,
    time_elapsed: `00:00:00`,
    time_in_minutes: null
  });

  function resetCurrentSession() {
    currentSession.value.project_id = null;
    currentSession.value.title = null;
    currentSession.value.stopped_at = null;
    currentSession.value.created_at = null;
    currentSession.value.time_elapsed = `00:00:00`;
    currentSession.value.time_in_minutes = null;
  }

  const groupSessionsByDay = computed(() => {

    return finishedSessions.value.reduce((groups, session) => {
      const date = new Date(session.created_at).toISOString().split('T')[0];
  
      if (!groups[date]) {
        groups[date] = [];
      }
  
      groups[date].push(session);
  
      return groups;
    }, {});
  })

  const currentProject = computed(() => {
    return projects.value.find(project => project.project_id === currentSession.value.project_id);
  })

  return {
    currentProject,
    currentSession, 
    runningSession,
    finishedSessions,
    groupSessionsByDay,
    resetCurrentSession
  };
});
