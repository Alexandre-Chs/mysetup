"use client";

import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import { GridStack } from "gridstack";
import React from "react";
import { toast } from "sonner";
import UploadSetupPicture from "./SetupMediaUpload";
import { updateSetupPhoto } from "@/app/api/setups/media/actions";

function randomFill(length: number) {
  let id = 0;
  return Array.from({ length }, () => ({ id: id++, w: 1, h: 1 }));
}

class SetupMedias extends React.Component<any> {
  state: any;

  constructor(props: any) {
    super(props);

    this.state = {
      grid: null,
      lock: false,
      occupiedCells: 0,
      photos: props.photos,
    };
  }

  async componentDidUpdate(prevProps: any) {
    if (prevProps.photos === this.props.photos) return;
    const allReadyExistingItems = this.state.grid.engine.nodes.map((item: any) => item.id);
    const newItems = this.props.photos.filter((item: any) => !allReadyExistingItems.includes(item.id));
    newItems.forEach((item: any) => {
      this.state.grid.addWidget({
        w: item.width,
        h: item.height,
        x: item.x,
        y: item.y,
        autoPosition: true,
        id: item.id,
        content: `<div class="grid-stack-item-content w-full h-full bg-cover bg-center rounded-lg" style="background-image: url('${item.media.url}');"></div>`,
      });
    });
  }

  async componentDidMount() {
    const grid = GridStack.init({
      column: 8,
      resizable: {
        handles: "se, sw, ne, nw",
      },
    });

    grid.on("added", () => {
      if (!this.state.grid) return;

      const gridItems = this.state.grid.engine.nodes;
      let occupiedCells = 0;

      gridItems.forEach((item: any) => {
        occupiedCells += item.w * item.h;
      });

      this.setState({ occupiedCells });
    });

    grid.on("change", async () => {
      grid.compact("compact");
      const gridItems = this.state.grid.engine.nodes;

      const items = gridItems.map((item: any) => {
        return {
          id: item.id,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        };
      });

      let occupiedCells = 0;

      gridItems.forEach((item: any) => {
        occupiedCells += item.w * item.h;
      });

      this.setState({ occupiedCells });

      await updateSetupPhoto(items);
    });

    this.setState({ grid }, () => {
      if (grid.getGridItems().length > 0) return;
      if (!this.state.photos) return;
      this.state.photos.forEach((item: any) => {
        const widget = grid.addWidget({
          w: item.width,
          h: item.height,
          x: item.x,
          y: item.y,
          autoPosition: true,
          id: item.id,
          content: `<div class="grid-stack-item-content w-full h-full bg-cover bg-center rounded-lg" style="background-image: url('${item.media.url}');"></div>`,
        });
      });
    });
  }

  componentWillUnmount(): void {
    if (this.state.grid) {
      this.state.grid.destroy();
    }
  }

  isGridFull = () => {
    const gridItems = this.state.grid.engine.nodes;
    let occupiedCells = 0;

    gridItems.forEach((item: any) => {
      occupiedCells += item.w * item.h;
    });

    const totalCells = 8 * 3;

    return occupiedCells >= totalCells;
  };

  addMore = () => {
    if (this.isGridFull()) {
      toast("Grid is full", {
        duration: 5000,
      });
      return;
    }
    randomFill(1).forEach((item: any) =>
      this.state.grid.addWidget({
        w: item.w,
        h: item.h,
        content: `<div class="grid-stack-item-content w-full h-full bg-cover bg-center rounded-lg bg-[url('https://placehold.co/600x400')]"></div>`,
      })
    );
  };

  render() {
    return (
      <div>
        <div className="grid-stack overflow-hidden"></div>
        <UploadSetupPicture />
      </div>
    );
  }
}

export default SetupMedias;
