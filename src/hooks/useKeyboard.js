import { useEffect } from "react";
 
export function useKeyboard(stateRef) {
    useEffect(() => {
        function handleKeyDown(e) {
            if (!stateRef.current) {
                return;
            }
            if (e.key === " ") {
                e.preventDefault();
            }
            stateRef.current.keys[e.key.toLowerCase()] = true;
        }
 
        function handleKeyUp(e) {
            if (!stateRef.current) {
                return;
            }
            stateRef.current.keys[e.key.toLowerCase()] = false;
        }
 
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
 
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [stateRef]);
}
 