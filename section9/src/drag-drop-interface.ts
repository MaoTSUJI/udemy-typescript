namespace App {
  /* Drag & Drop */
  export interface Draggable {
    // 処理を実装することを強制するので、チーム作成時に分かりやすくなる
    dragStartHandler(event: DragEvent): void;

    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
  }
}
