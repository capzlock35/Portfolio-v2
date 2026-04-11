// @ts-nocheck
// @ts-nocheck
"use client";

import { useEffect } from "react";

const useCanvasCursor = () => {
  function Oscillator(e) {
    this.init(e || {});
  }

  Oscillator.prototype = {
    init: function (e) {
      this.phase = e.phase || 0;
      this.offset = e.offset || 0;
      this.frequency = e.frequency || 0.001;
      this.amplitude = e.amplitude || 1;
      this._value = 0;
    },
    update: function () {
      this.phase += this.frequency;
      this._value =
        this.offset + Math.sin(this.phase) * this.amplitude;
      return this._value;
    },
    value: function () {
      return this._value;
    },
  };

  function Node() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
  }

  function Line(e) {
    this.init(e || {});
  }

  let ctx;
  let f;
  let pos = { x: 0, y: 0 };
  let lines: any[] = [];

  const E = {
    friction: 0.5,
    trails: 20,
    size: 50,
    dampening: 0.25,
    tension: 0.98,
  };

  Line.prototype = {
    init: function (e) {
      this.spring = e.spring + 0.1 * Math.random() - 0.02;
      this.friction = E.friction + 0.01 * Math.random() - 0.002;
      this.nodes = [];

      for (let i = 0; i < E.size; i++) {
        const node = new Node();
        node.x = pos.x;
        node.y = pos.y;
        this.nodes.push(node);
      }
    },

    update: function () {
      let spring = this.spring;
      let node = this.nodes[0];

      node.vx += (pos.x - node.x) * spring;
      node.vy += (pos.y - node.y) * spring;

      for (let i = 0; i < this.nodes.length; i++) {
        node = this.nodes[i];

        if (i > 0) {
          const prev = this.nodes[i - 1];
          node.vx += (prev.x - node.x) * spring;
          node.vy += (prev.y - node.y) * spring;
          node.vx += prev.vx * E.dampening;
          node.vy += prev.vy * E.dampening;
        }

        node.vx *= this.friction;
        node.vy *= this.friction;
        node.x += node.vx;
        node.y += node.vy;

        spring *= E.tension;
      }
    },

    draw: function () {
      let x = this.nodes[0].x;
      let y = this.nodes[0].y;

      ctx.beginPath();
      ctx.moveTo(x, y);

      for (let i = 1; i < this.nodes.length - 2; i++) {
        const curr = this.nodes[i];
        const next = this.nodes[i + 1];

        x = (curr.x + next.x) * 0.5;
        y = (curr.y + next.y) * 0.5;

        ctx.quadraticCurveTo(curr.x, curr.y, x, y);
      }

      const last = this.nodes[this.nodes.length - 2];
      const lastNext = this.nodes[this.nodes.length - 1];

      ctx.quadraticCurveTo(last.x, last.y, lastNext.x, lastNext.y);

      ctx.stroke();
      ctx.closePath();
    },
  };

  function initLines() {
    lines = [];
    for (let i = 0; i < E.trails; i++) {
      lines.push(
        new Line({ spring: 0.4 + (i / E.trails) * 0.025 })
      );
    }
  }

  function updateMouse(e) {
    if (e.touches) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    } else {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }
  }

  function render() {
    if (!ctx || !ctx.running) return;

    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 1;

    for (let i = 0; i < E.trails; i++) {
      const line = lines[i];
      line.update();
      line.draw();
    }

    requestAnimationFrame(render);
  }

  function resizeCanvas() {
    if (!ctx) return;
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }

  function start(e) {
    updateMouse(e);
    initLines();
    render();

    document.removeEventListener("mousemove", start);
    document.removeEventListener("touchstart", start);

    document.addEventListener("mousemove", updateMouse);
    document.addEventListener("touchmove", updateMouse);
  }

  useEffect(() => {
    const canvas = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement | null;

    if (!canvas) return;

    ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.running = true;

    f = new Oscillator({
      phase: Math.random() * Math.PI * 2,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    document.addEventListener("mousemove", start);
    document.addEventListener("touchstart", start);

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();

    return () => {
      ctx.running = false;
      document.removeEventListener("mousemove", start);
      document.removeEventListener("touchstart", start);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
};

export default useCanvasCursor;