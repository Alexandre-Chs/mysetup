"use client";
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/gridstack-extra.min.css';
import { GridStack } from 'gridstack';
import React from "react";
import { toast } from 'sonner';
import UploadSetupPicture from './UploadSetupPicture';

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
      occupiedCells: 0,
    };
  }

  async componentDidMount() {
    const grid = GridStack.init({
        column: 8,
        resizable: {
          handles: 'se, sw, ne, nw'
        }
    });
    grid.on('added', () => {
      if (!this.state.grid) return;

      const gridItems = this.state.grid.engine.nodes;
      let occupiedCells = 0;

      gridItems.forEach((item: any) => {
        occupiedCells += item.w * item.h;
      });

      this.setState({occupiedCells});
    });
    grid.on('change', () => {
      grid.compact('compact');
      const gridItems = this.state.grid.engine.nodes;
      let occupiedCells = 0;

      gridItems.forEach((item: any) => {
        occupiedCells += item.w * item.h;
      });

      this.setState({occupiedCells});
    })
    this.setState({grid},() => {
      randomFill(10).forEach((item: any) => grid.addWidget({w: item.w, h: item.h, autoPosition: true, content: `<div class="grid-stack-item-content w-full h-full bg-cover bg-center rounded-lg bg-[url('https://placehold.co/600x400')]"></div>`}));
    })
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
      toast('Grid is full', {
        duration: 5000,
      })
      return
    };
    randomFill(1).forEach((item: any) => this.state.grid.addWidget({w: item.w, h: item.h, content: `<div class="grid-stack-item-content w-full h-full bg-cover bg-center rounded-lg bg-[url('https://placehold.co/600x400')]"></div>`}));
  }

  render() {
    return (
      <>
        <div className="grid-stack overflow-hidden"></div>
        <UploadSetupPicture pictureCount={this.state.occupiedCells}/>
      </>

    );
  }
}

export default PhotosUser;
