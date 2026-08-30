"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RadialOrbitalTimeline({
  timelineData,
}) {
  const [expandedItems, setExpandedItems] = useState({});
  const [viewMode, setViewMode] = useState("orbital");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [centerOffset, setCenterOffset] = useState({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState(null);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const radius = isMobile ? 110 : 220; // responsive radius
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "active":
        return "text-[#0A0A0C] bg-white border-white";
      case "exploring":
        return "text-white bg-[#0052FF] border-[#0052FF]";
      case "core":
        return "text-white bg-black/60 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full h-auto min-h-[90vh] md:min-h-[100vh] flex flex-col items-center justify-center relative py-20 overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="absolute top-10 w-full text-center z-20">
        <span className="text-xs font-semibold tracking-[0.2em] opacity-60">UZMANLIK</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2 px-4" style={{ letterSpacing: "-0.04em" }}>Çalışma Alanlarımız</h2>
      </div>

      <div className="relative w-full max-w-4xl h-[600px] md:h-full flex items-center justify-center mt-10 md:mt-0">
        <div
          className="absolute w-full h-full flex items-start pt-[50px] md:pt-0 md:items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Sitenin renk paletine uygun merkez çekirdek */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#050b14] via-[#0033a0] to-[#00d4ff] animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md"></div>
          </div>

          <div className="absolute w-[220px] h-[220px] md:w-[440px] md:h-[440px] rounded-full border border-white/10"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.capacity * 0.5 + 40}px`,
                    height: `${item.capacity * 0.5 + 40}px`,
                    left: `-${(item.capacity * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.capacity * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-white text-[#0A0A0C]"
                      : isRelated
                      ? "bg-white/30 text-white"
                      : "bg-[#0A0A0C] text-white"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-white shadow-lg shadow-[#0052FF]/30"
                      : isRelated
                      ? "border-white animate-pulse"
                      : "border-white/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-125 md:scale-150" : ""}
                `}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-white scale-110 md:scale-125" : "text-[var(--color-text-muted)]"}
                `}
                >
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Side Panel Card for Active Node */}
        <div
          className={`absolute bottom-0 md:bottom-auto md:top-1/2 left-1/2 md:left-10 lg:left-[10%] -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 w-[90vw] md:w-80 lg:w-96 z-[1000] transition-all duration-700 ease-out transform ${
            activeNodeId ? "opacity-100 translate-y-0 md:translate-x-0" : "opacity-0 translate-y-8 md:translate-y-[-50%] md:-translate-x-12 pointer-events-none"
          }`}
        >
          {activeNodeId && (() => {
            const item = timelineData.find((i) => i.id === activeNodeId);
            if (!item) return null;
              
              return (
                <div className="relative group">
                  {/* Animated Gradient Border / Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#0033a0] via-[#00d4ff] to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  
                  <Card className="relative bg-[#0A0A0C]/90 backdrop-blur-2xl border-white/10 shadow-2xl overflow-hidden rounded-2xl">
                    {/* Top glass reflection */}
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                    
                    <CardHeader className="pb-2 relative z-10">
                      <div className="flex justify-between items-center mb-2">
                        <Badge
                          className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-0 ${
                            item.status === "active"
                              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(0,212,255,0.5)]"
                              : item.status === "core"
                              ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                              : "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                          }`}
                        >
                          {item.status === "active"
                            ? "AKTİF ALAN"
                            : item.status === "core"
                            ? "TEMEL ALAN"
                            : "YENİ NESİL"}
                        </Badge>
                        <span className="text-xs font-mono text-white/40 tracking-wider">
                          NODE_{item.id}
                        </span>
                      </div>
                      
                      <CardTitle className="text-2xl md:text-3xl mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 font-black tracking-tight" style={{ letterSpacing: "-0.04em" }}>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="text-sm text-white/70 relative z-10">
                      <p className="leading-relaxed font-medium">{item.content}</p>

                      <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex justify-between items-center text-xs mb-3">
                          <span className="flex items-center text-white font-semibold tracking-wide">
                            <Activity size={14} className="mr-2 text-[#00d4ff] animate-pulse" />
                            KAPASİTE KULLANIMI
                          </span>
                          <span className="font-mono text-[#00d4ff] font-bold text-sm">% {item.capacity}</span>
                        </div>
                        <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/5 relative">
                          {/* Animated progress bar */}
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0033a0] via-[#00d4ff] to-[#0033a0] bg-[length:200%_100%] animate-[gradient_2s_linear_infinite]"
                            style={{ width: `${item.capacity}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-6">
                          <div className="flex items-center mb-3">
                            <Link size={12} className="text-white/40 mr-2" />
                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
                              SİNERJİ / BAĞLANTILAR
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <button
                                  key={relatedId}
                                  className="group flex items-center h-7 px-3 text-xs rounded-full border border-white/10 bg-white/5 hover:bg-white/20 text-white/80 hover:text-white transition-all overflow-hidden relative"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
                                  <span className="relative z-10">{relatedItem?.title}</span>
                                  <ArrowRight size={10} className="ml-1.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })()}
        </div>
      </div>
    </div>
  );
}
