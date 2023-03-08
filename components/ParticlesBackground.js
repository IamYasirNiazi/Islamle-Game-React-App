import React, { useCallback } from "react";
import { loadFull } from "tsparticles";
import Particles from "react-particles";
import particlesConfig from "@/config/particles-config";


const ParticlesBackground = () => {

    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
    }, []);

    return (
        <div id="particle-background">
        <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particlesConfig}></Particles>
        </div>
    );
};

export default ParticlesBackground;