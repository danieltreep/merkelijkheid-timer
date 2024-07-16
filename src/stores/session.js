import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";

export const useSessionStore = defineStore("session", () => {

  const { sessions, projects } = storeToRefs(useDataStore());
  const sessionDateChange = ref({})
  
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
    time_elapsed: `00:00:00`
  });

  function resetCurrentSession() {
    currentSession.value.project_id = null;
    currentSession.value.title = null;
    currentSession.value.stopped_at = null;
    currentSession.value.created_at = null;
    currentSession.value.time_elapsed = `00:00:00`;
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

  const stackedSessions = computed(() => {
    let sessionGroups = {};

    Object.entries(groupSessionsByDay.value).forEach(([date, daySessions]) => {
      sessionGroups[date] = {};

      daySessions.forEach(session => {
        let key = `${session.title}-${session.project_id}`;

        if (!sessionGroups[date][key]) {
          sessionGroups[date][key] = [];
        }

        sessionGroups[date][key].push(session);
      });
    });

    return sessionGroups;
  })

  const currentProject = computed(() => {
    return projects.value.find(project => project.project_id === currentSession.value.project_id);
  })

  return {
    currentProject,
    currentSession, 
    runningSession,
    finishedSessions,
    stackedSessions,
    groupSessionsByDay,
    sessionDateChange,
    resetCurrentSession
  };
});