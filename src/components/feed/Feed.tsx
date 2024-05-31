"use client";
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import React from 'react';

class Feed extends React.Component {
    content = [
      {id: 1, w: 2, h: 1},
      {id: 2, w: 2, h: 2},
      {id: 3, w: 1, h: 1},
      {id: 4, w: 1, h: 1},
      {id: 5, w: 1, h: 1},
      {id: 6, w: 1, h: 1},
      {id: 7, w: 2, h: 1},
      {id: 8, w: 1, h: 1},
      {id: 9, w: 1, h: 2},
      {id: 10, w: 1, h: 1},
      {id: 11, w: 3, h: 1},
      {id: 12, w: 1, h: 3},
      {id: 13, w: 2, h: 1},
      {id: 14, w: 1, h: 1},
      {id: 15, w: 1, h: 2},
    ]

    componentDidMount() {
      const grid = GridStack.init({
          float: true,
          disableDrag: true,
          disableResize: true,
      });
    }

    render() {
      return (
        <div className="grid-stack" gs-breakpointForWindow="true">
          {this.content.map((item, index) => (
            <div key={item.id} gs-w={item.w} gs-h={item.h} className="grid-stack-item">
              <div className="grid-stack-item-content bg-cover bg-center rounded-lg bg-[url('https://placehold.co/600x400')]"></div>
            </div>
          ))}
        </div>
      )
    }
}
export default Feed;