"use client";
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/gridstack-extra.min.css';
import { GridStack } from 'gridstack';
import React from "react";

function randomFill(length: number) {
  let id = 0;
  return Array.from({ length }, () => ({ id: id++, w: 1, h: 1 }));
}

class PhotosUser extends React.Component {
  state: any;

  constructor(props: any) {
    super(props);
    this.state = {
      grid: null,
      lock: false,
    };
  }

  async componentDidMount() {
    const grid = GridStack.init({
        column: 8,
        resizable: {
          handles: 'se, sw, ne, nw'
        }
    });
    grid.on('change', () => {
      grid.compact('compact');
    })
    randomFill(1).forEach((item: any) => grid.addWidget({w: item.w, h: item.h, autoPosition: true, content: `<div class="grid-stack-item-content w-full h-full bg-cover bg-center rounded-lg bg-[url('https://placehold.co/600x400')]"></div>`}));
    this.setState({grid});
  }

  isGridFull = () => {
    const gridItems = this.state.grid.engine.nodes;
    let occupiedCells = 0;

    gridItems.forEach((item: any) => {
      occupiedCells += item.w * item.h;
    });

    const totalCells = 8 * 3;

    return occupiedCells >= totalCells;
  }

  addMore = () => {
    if (this.isGridFull()) {
      alert('Grid is full');
      return
    };
    randomFill(1).forEach((item: any) => this.state.grid.addWidget({w: item.w, h: item.h, content: `<div class="grid-stack-item-content w-full h-full bg-cover bg-center rounded-lg bg-[url('https://placehold.co/600x400')]"></div>`}));
  }

  render() {
    return (
      <>
        <div className="grid-stack overflow-hidden"></div>
        <button onClick={() => this.addMore()}>Add one</button>
      </>

    );
  }
}

export default PhotosUser;
