import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useSessionStore } from "@/stores/session";
import { useUserStore } from "@/stores/user";

import postData from "@/composables/postData";
import patchData from "@/composables/patchData";
import deleteData from "@/composables/deleteData";
import { makeDateSqlCompatible, calculateTimeElapsed } from "@/composables/functions"

export const useTimerStore = defineStore("timer", () => {

    const { currentSession } = storeToRefs(useSessionStore())
    const { resetCurrentSession } = useSessionStore()
    const { user } = storeToRefs(useUserStore());

    const currentSessionId = ref(null)
    const timerRunning = ref(false);

    let timerInterval = null;

    async function startTimerStore() {
        if (!timerRunning.value) {
            timerRunning.value = true;
            currentSession.value.created_at = new Date();
            currentSession.value.stopped_at = null;
            currentSessionId.value = await postData('sessions', {
                ...currentSession.value, 
                created_at: makeDateSqlCompatible(new Date()), 
                user_id: user.value.user_id, 
                is_running: 1, 
                shared_with: JSON.stringify(currentSession.value.shared_with)
            })
        }
        timerInterval = setInterval(clockRunning, 1000);
    }

    function continueTimerStore(session) {
        currentSession.value = { 
            title: session.title,
            project_id: session.project_id,
            task_id: session.task_id,
            created_at: new Date(session.created_at),
            stopped_at: null,
            time_elapsed: `00:00:00`
        };
        currentSessionId.value = session.session_id;
        timerRunning.value = true;
        timerInterval = setInterval(clockRunning, 1000);
    }

    function stopTimerStore() {
        clearInterval(timerInterval);
        timerRunning.value = false;
        
        currentSession.value.stopped_at = new Date();

        // Zet Date waarden om zodat ze in de database kunnen
        currentSession.value.created_at = makeDateSqlCompatible(currentSession.value.created_at);
        currentSession.value.stopped_at = makeDateSqlCompatible(currentSession.value.stopped_at);
        
        // Stop interval en POST de data
        patchData("sessions", currentSessionId.value, {...currentSession.value, is_running: 0, shared_with: JSON.stringify(currentSession.value.shared_with)});

        // Reset de waarden van de huidige sessie
        resetCurrentSession();
    }

    function clockRunning() {
        const currentTime = new Date(); 
        currentSession.value.time_elapsed = calculateTimeElapsed(currentSession.value.created_at, currentTime);
    }

    function clearTimerStore() {
        clearInterval(timerInterval);
        timerRunning.value = false;
        deleteData('sessions', currentSessionId.value)
        resetCurrentSession();
      
    }
  

    return {
        // currentSession, 
        currentSessionId,
        timerRunning,
        startTimerStore,
        stopTimerStore,
        clearTimerStore,
        continueTimerStore
    };
});
