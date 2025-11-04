// 图片查看器功能重新实现
// 图片查看器类
class ImageViewer {
  private viewerWrapper: HTMLElement | null = null;
  private canvas: HTMLElement | null = null;
  private closeBtn: HTMLElement | null = null;
  private rotateBtn: HTMLElement | null = null;
  private prevBtn: HTMLElement | null = null;
  private nextBtn: HTMLElement | null = null;
  private fullScreenBtn: HTMLElement | null = null;
  private originalSizeBtn: HTMLElement | null = null;
  private zoomInBtn: HTMLElement | null = null;
  private zoomOutBtn: HTMLElement | null = null;
  private currentImg: HTMLImageElement | null = null;
  private imgList: string[] = [];
  private currentIndex: number = 0;
  private scale: number = 1;
  private rotation: number = 0;
  private isFullScreen: boolean = false;
  private isVpDocImage: boolean = false;

  private isDragging: boolean = false;
  private dragStartX: number = 0;
  private dragStartY: number = 0;
  private translateX: number = 0;
  private translateY: number = 0;

  constructor() {
    this.init();
  }

  // 初始化 - 监听页面中的图片点击
  private init() {
    if (typeof window === "undefined") return;

    // 等待DOM加载完成
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", this.setupImageListeners.bind(this));
    } else {
      this.setupImageListeners();
    }

    // 监听页面内容更新（如SPA路由切换）
    this.observeDOMChanges();
  }

  // 设置图片点击监听
  private setupImageListeners() {
    // 为所有图片添加点击事件，但标记图片来源以区分处理
    const allImages = document.querySelectorAll("img:not(.tk-image-viewer__canvas img)");
    allImages.forEach(img => {
      const htmlImg = img as HTMLImageElement;
      // 确保只添加一次点击事件
      if (!htmlImg.dataset.imageViewerInitialized) {
        htmlImg.dataset.imageViewerInitialized = "true";
        htmlImg.style.cursor = "pointer";

        // 标记图片是否在vp-doc内
        const isVpDocImage = htmlImg.closest(".vp-doc") !== null;
        htmlImg.dataset.isVpDocImage = String(isVpDocImage);

        // 为所有图片添加点击事件
        htmlImg.addEventListener("click", (e: MouseEvent) => this.handleImageClick(e, htmlImg));
      }
    });
  }

  // 监听DOM变化，为新添加的图片设置监听
  private observeDOMChanges() {
    const observer = new MutationObserver(() => {
      this.setupImageListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // 处理图片点击事件
  private handleImageClick(event: MouseEvent, img: HTMLImageElement) {
    // 阻止事件冒泡
    event.stopPropagation();

    // 保存当前图片类型
    this.isVpDocImage = img.dataset.isVpDocImage === "true";

    // 收集与当前图片同类的所有图片
    this.collectImages(this.isVpDocImage);

    // 找到当前点击的图片索引
    this.currentIndex = this.imgList.findIndex(src => src === img.src);

    // 创建查看器
    this.createViewer(img.src);
  }

  // 收集指定类型的图片
  private collectImages(isVpDocImage: boolean) {
    this.imgList = [];

    if (isVpDocImage) {
      const vpDocElement = document.querySelector(".vp-doc");
      if (vpDocElement) {
        const images = vpDocElement.querySelectorAll("img:not(.tk-image-viewer__canvas img)");
        images.forEach(img => {
          this.imgList.push((img as HTMLImageElement).src);
        });
      }
    } else {
      const nonVpDocImages = document.querySelectorAll("img:not(.tk-image-viewer__canvas img):not(.vp-doc img)");
      nonVpDocImages.forEach(img => {
        this.imgList.push((img as HTMLImageElement).src);
      });
    }
  }

  // 获取当前收集的图片数量
  private getCurrentImageCount() {
    return this.imgList.length;
  }

  // 创建图片查看器
  private createViewer(src: string) {
    this.removeViewer();

    // 创建查看器容器
    this.viewerWrapper = document.createElement("div");
    this.viewerWrapper.className = "tk-image-viewer__wrapper";

    // 创建图片容器
    this.canvas = document.createElement("div");
    this.canvas.className = "tk-image-viewer__canvas";

    // 创建查看器中的图片
    const viewerImg = document.createElement("img");
    viewerImg.src = src;
    viewerImg.style.transform = "none";
    this.currentImg = viewerImg;

    // 创建关闭按钮
    this.closeBtn = document.createElement("button");
    this.closeBtn.className = "tk-image-viewer__close";
    this.closeBtn.innerHTML = '<i class="tk-icon">❌</i>';

    // 创建操作按钮容器
    const actionsContainer = document.createElement("div");
    actionsContainer.className = "tk-image-viewer__actions";

    // 创建旋转按钮
    this.rotateBtn = document.createElement("button");
    this.rotateBtn.className = "tk-image-viewer__btn";
    this.rotateBtn.innerHTML = '<i class="tk-icon">🔄</i>';

    // 创建上一张按钮
    this.prevBtn = document.createElement("button");
    this.prevBtn.className = "tk-image-viewer__btn";
    this.prevBtn.innerHTML = '<i class="tk-icon">⬅️</i>';

    // 创建缩小按钮
    this.zoomOutBtn = document.createElement("button");
    this.zoomOutBtn.className = "tk-image-viewer__btn";
    this.zoomOutBtn.innerHTML = '<i class="tk-icon">➖</i>';

    // 创建全屏按钮
    this.fullScreenBtn = document.createElement("button");
    this.fullScreenBtn.className = "tk-image-viewer__btn";
    this.fullScreenBtn.innerHTML = '<i class="tk-icon">🔳</i>';

    // 创建原始大小按钮
    this.originalSizeBtn = document.createElement("button");
    this.originalSizeBtn.className = "tk-image-viewer__btn";
    this.originalSizeBtn.innerHTML = '<i class="tk-icon">🔍</i>';

    // 创建放大按钮
    this.zoomInBtn = document.createElement("button");
    this.zoomInBtn.className = "tk-image-viewer__btn";
    this.zoomInBtn.innerHTML = '<i class="tk-icon">➕</i>';

    // 创建下一张按钮
    this.nextBtn = document.createElement("button");
    this.nextBtn.className = "tk-image-viewer__btn";
    this.nextBtn.innerHTML = '<i class="tk-icon">➡️</i>';

    // 🚀底部功能操作按钮排序
    actionsContainer.appendChild(this.prevBtn);
    actionsContainer.appendChild(this.nextBtn);
    actionsContainer.appendChild(this.zoomInBtn);
    actionsContainer.appendChild(this.zoomOutBtn);
    actionsContainer.appendChild(this.fullScreenBtn);
    actionsContainer.appendChild(this.rotateBtn);
    actionsContainer.appendChild(this.originalSizeBtn);

    this.canvas.appendChild(viewerImg);
    this.viewerWrapper.appendChild(this.canvas);
    this.viewerWrapper.appendChild(this.closeBtn);
    this.viewerWrapper.appendChild(actionsContainer);

    // 仅在vp-doc内的图片才显示计数信息
    if (this.isVpDocImage) {
      const infoContainer = document.createElement("div");
      infoContainer.className = "tk-image-viewer__info";
      infoContainer.textContent = `${this.currentIndex + 1} / ${this.getCurrentImageCount()}`;
      (this.viewerWrapper as any).infoContainer = infoContainer;
      this.viewerWrapper.appendChild(infoContainer);
    } else {
      if (this.prevBtn) {
        (this.prevBtn as HTMLButtonElement).disabled = true;
        this.prevBtn.classList.add("tk-image-viewer__btn--disabled");
      }
      if (this.nextBtn) {
        (this.nextBtn as HTMLButtonElement).disabled = true;
        this.nextBtn.classList.add("tk-image-viewer__btn--disabled");
      }
    }

    // 添加到页面
    document.body.appendChild(this.viewerWrapper);

    // 添加事件监听
    this.addViewerEventListeners(viewerImg);
  }

  // 添加查看器事件监听
  private addViewerEventListeners(img: HTMLImageElement) {
    if (!this.viewerWrapper || !this.canvas || !this.closeBtn) return;

    // 重置状态变量
    this.scale = 1;
    this.rotation = 0;
    this.isFullScreen = false;

    // 配置参数
    const scaleStep = 0.1;
    const maxScale = 3;
    const minScale = 0.5;
    const rotateStep = 90;

    // 更新图片变换 - 包含拖拽移动
    const updateTransform = () => {
      img.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale}) rotate(${this.rotation}deg)`;
    };

    // 点击图片区域不关闭，允许其他交互
    img.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
    });

    // 拖拽开始
    const handleDragStart = (e: MouseEvent) => {
      e.stopPropagation();
      this.isDragging = true;
      this.dragStartX = e.clientX - this.translateX;
      this.dragStartY = e.clientY - this.translateY;
      document.body.style.userSelect = "none";
    };

    // 拖拽移动
    const handleDragMove = (e: MouseEvent) => {
      if (!this.isDragging) return;
      this.translateX = e.clientX - this.dragStartX;
      this.translateY = e.clientY - this.dragStartY;
      updateTransform();
    };

    // 拖拽结束
    const handleDragEnd = () => {
      this.isDragging = false;
      document.body.style.userSelect = "";
    };

    // 添加拖拽事件监听
    img.addEventListener("mousedown", handleDragStart);
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("mouseleave", handleDragEnd);

    // 移动设备触摸事件支持
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      e.stopPropagation();
      this.isDragging = true;
      this.dragStartX = touch.clientX - this.translateX;
      this.dragStartY = touch.clientY - this.translateY;
      document.body.style.userSelect = "none";
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const touch = e.touches[0];
      e.preventDefault();
      this.translateX = touch.clientX - this.dragStartX;
      this.translateY = touch.clientY - this.dragStartY;
      updateTransform();
    };

    const handleTouchEnd = () => {
      this.isDragging = false;
      document.body.style.userSelect = "";
    };

    // 添加触摸事件监听
    img.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchcancel", handleTouchEnd);

    // 点击查看器背景关闭
    this.viewerWrapper.addEventListener("click", () => {
      this.removeViewer();
    });

    // 点击关闭按钮关闭
    this.closeBtn.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
      this.removeViewer();
    });

    // 旋转按钮事件
    if (this.rotateBtn) {
      const rotateBtnRef = this.rotateBtn;
      this.rotateBtn.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();
        this.rotation = (this.rotation + rotateStep) % 360;
        updateTransform();
        rotateBtnRef.classList.add("tk-image-viewer__btn--active");
        setTimeout(() => {
          rotateBtnRef.classList.remove("tk-image-viewer__btn--active");
        }, 200);
      });
    }

    // 上一张按钮事件
    this.prevBtn!.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
      if (this.isVpDocImage && this.imgList.length > 1) {
        this.currentIndex = (this.currentIndex - 1 + this.imgList.length) % this.imgList.length;
        this.switchImage(this.imgList[this.currentIndex]);
        this.prevBtn!.classList.add("tk-image-viewer__btn--active");
        setTimeout(() => {
          this.prevBtn!.classList.remove("tk-image-viewer__btn--active");
        }, 200);
      }
    });

    // 下一张按钮事件
    this.nextBtn!.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
      if (this.isVpDocImage && this.imgList.length > 1) {
        this.currentIndex = (this.currentIndex + 1) % this.imgList.length;
        this.switchImage(this.imgList[this.currentIndex]);
        this.nextBtn!.classList.add("tk-image-viewer__btn--active");
        setTimeout(() => {
          this.nextBtn!.classList.remove("tk-image-viewer__btn--active");
        }, 200);
      }
    });

    // 全屏按钮事件
    if (this.fullScreenBtn) {
      const fullScreenBtnRef = this.fullScreenBtn;
      this.fullScreenBtn.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();
        this.isFullScreen = !this.isFullScreen;
        if (this.isFullScreen) {
          img.style.maxWidth = "none";
          img.style.maxHeight = "none";
          fullScreenBtnRef.innerHTML = '<i class="tk-icon">🔲</i>';
        } else {
          img.style.maxWidth = "100%";
          img.style.maxHeight = "100%";
          fullScreenBtnRef.innerHTML = '<i class="tk-icon">🔳</i>';
        }
        fullScreenBtnRef.classList.add("tk-image-viewer__btn--active");
        setTimeout(() => {
          fullScreenBtnRef.classList.remove("tk-image-viewer__btn--active");
        }, 200);
      });
    }

    // 原始大小按钮事件
    if (this.originalSizeBtn) {
      const originalSizeBtnRef = this.originalSizeBtn;
      this.originalSizeBtn.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();
        this.scale = 1;
        this.rotation = 0;
        this.translateX = 0;
        this.translateY = 0;
        updateTransform();
        originalSizeBtnRef.classList.add("tk-image-viewer__btn--active");
        setTimeout(() => {
          originalSizeBtnRef.classList.remove("tk-image-viewer__btn--active");
        }, 200);
      });
    }

    // 放大按钮事件
    if (this.zoomInBtn) {
      const zoomInBtnRef = this.zoomInBtn;
      this.zoomInBtn.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();
        if (this.scale < maxScale) {
          this.scale += scaleStep;
          updateTransform();
          zoomInBtnRef.classList.add("tk-image-viewer__btn--active");
          setTimeout(() => {
            zoomInBtnRef.classList.remove("tk-image-viewer__btn--active");
          }, 200);
        }
      });
    }

    // 缩小按钮事件
    if (this.zoomOutBtn) {
      const zoomOutBtnRef = this.zoomOutBtn;
      this.zoomOutBtn.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();
        if (this.scale > minScale) {
          this.scale -= scaleStep;
          updateTransform();
          zoomOutBtnRef.classList.add("tk-image-viewer__btn--active");
          setTimeout(() => {
            zoomOutBtnRef.classList.remove("tk-image-viewer__btn--active");
          }, 200);
        }
      });
    }

    // 键盘快捷键处理
    const handleKeydown = (e: KeyboardEvent) => {
      e.preventDefault();

      switch (e.key) {
        case "Escape":
          this.removeViewer();
          break;
        case "+":
        case "=":
          if (this.scale < maxScale) {
            this.scale += scaleStep;
            updateTransform();
          }
          break;
        case "-":
          if (this.scale > minScale) {
            this.scale -= scaleStep;
            updateTransform();
          }
          break;
        case "r":
        case "R":
          this.rotation = (this.rotation + rotateStep) % 360;
          updateTransform();
          break;
        case "ArrowLeft":
          if (this.isVpDocImage && this.imgList.length > 1) {
            this.currentIndex = (this.currentIndex - 1 + this.imgList.length) % this.imgList.length;
            this.switchImage(this.imgList[this.currentIndex]);
          }
          break;
        case "ArrowRight":
          if (this.isVpDocImage && this.imgList.length > 1) {
            this.currentIndex = (this.currentIndex + 1) % this.imgList.length;
            this.switchImage(this.imgList[this.currentIndex]);
          }
          break;
        case "0":
          this.scale = 1;
          this.rotation = 0;
          this.translateX = 0;
          this.translateY = 0;
          updateTransform();
          break;
        case "f":
        case "F":
          this.isFullScreen = !this.isFullScreen;
          if (this.isFullScreen) {
            img.style.maxWidth = "none";
            img.style.maxHeight = "none";
            if (this.fullScreenBtn) {
              this.fullScreenBtn.innerHTML = '<i class="tk-icon">🔲</i>';
            }
          } else {
            img.style.maxWidth = "100%";
            img.style.maxHeight = "100%";
            if (this.fullScreenBtn) {
              this.fullScreenBtn.innerHTML = '<i class="tk-icon">🔳</i>';
            }
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeydown);

    // 鼠标滚轮缩放
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0 && this.scale < maxScale) {
        this.scale += scaleStep;
        updateTransform();
      } else if (e.deltaY > 0 && this.scale > minScale) {
        this.scale -= scaleStep;
        updateTransform();
      }
    };

    this.viewerWrapper.addEventListener("wheel", handleWheel, { passive: false });

    // 保存事件处理器引用，以便后续移除
    (this.viewerWrapper as any).keydownHandler = handleKeydown;
    (this.viewerWrapper as any).wheelHandler = handleWheel;
    (this.viewerWrapper as any).dragStartHandler = handleDragStart;
    (this.viewerWrapper as any).dragMoveHandler = handleDragMove;
    (this.viewerWrapper as any).dragEndHandler = handleDragEnd;
    (this.viewerWrapper as any).touchStartHandler = handleTouchStart;
    (this.viewerWrapper as any).touchMoveHandler = handleTouchMove;
    (this.viewerWrapper as any).touchEndHandler = handleTouchEnd;
  }

  // 切换图片
  private switchImage(newSrc: string) {
    if (!this.currentImg || !this.viewerWrapper) return;

    // 淡入淡出效果
    this.currentImg.style.opacity = "0";

    setTimeout(() => {
      if (this.currentImg) {
        this.currentImg.src = newSrc;
        this.currentImg.style.opacity = "1";
        this.currentImg.style.transform = `scale(${this.scale}) rotate(${this.rotation}deg)`;
        if (this.isFullScreen) {
          this.currentImg.style.maxWidth = "none";
          this.currentImg.style.maxHeight = "none";
        } else {
          this.currentImg.style.maxWidth = "100%";
          this.currentImg.style.maxHeight = "100%";
        }
      }

      if (this.isVpDocImage) {
        const infoContainer = (this.viewerWrapper as any).infoContainer;
        if (infoContainer) {
          infoContainer.textContent = `${this.currentIndex + 1} / ${this.getCurrentImageCount()}`;
        }
      }
    }, 200);
  }

  private removeViewer() {
    if (this.viewerWrapper) {
      const keydownHandler = (this.viewerWrapper as any).keydownHandler;
      const wheelHandler = (this.viewerWrapper as any).wheelHandler;
      const dragStartHandler = (this.viewerWrapper as any).dragStartHandler;
      const dragMoveHandler = (this.viewerWrapper as any).dragMoveHandler;
      const dragEndHandler = (this.viewerWrapper as any).dragEndHandler;
      const touchStartHandler = (this.viewerWrapper as any).touchStartHandler;
      const touchMoveHandler = (this.viewerWrapper as any).touchMoveHandler;
      const touchEndHandler = (this.viewerWrapper as any).touchEndHandler;

      if (keydownHandler) {
        document.removeEventListener("keydown", keydownHandler);
      }
      if (wheelHandler) {
        this.viewerWrapper.removeEventListener("wheel", wheelHandler);
      }
      if (dragStartHandler && this.currentImg) {
        this.currentImg.removeEventListener("mousedown", dragStartHandler);
      }
      if (dragMoveHandler) {
        document.removeEventListener("mousemove", dragMoveHandler);
      }
      if (dragEndHandler) {
        document.removeEventListener("mouseup", dragEndHandler);
        document.removeEventListener("mouseleave", dragEndHandler);
      }

      if (touchStartHandler && this.currentImg) {
        this.currentImg.removeEventListener("touchstart", touchStartHandler);
      }
      if (touchMoveHandler) {
        document.removeEventListener("touchmove", touchMoveHandler);
      }
      if (touchEndHandler) {
        document.removeEventListener("touchend", touchEndHandler);
        document.removeEventListener("touchcancel", touchEndHandler);
      }

      document.body.style.userSelect = "";

      this.viewerWrapper.classList.add("tk-image-viewer__wrapper--fade-out");

      setTimeout(() => {
        if (this.viewerWrapper && this.viewerWrapper.parentNode) {
          this.viewerWrapper.parentNode.removeChild(this.viewerWrapper);
        }

        this.viewerWrapper = null;
        this.canvas = null;
        this.closeBtn = null;
        this.rotateBtn = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.fullScreenBtn = null;
        this.originalSizeBtn = null;
        this.zoomInBtn = null;
        this.zoomOutBtn = null;
        this.currentImg = null;
        this.imgList = [];
        this.currentIndex = 0;
        this.scale = 1;
        this.rotation = 0;
        this.isFullScreen = false;
        this.isVpDocImage = false;
        this.isDragging = false;
        this.translateX = 0;
        this.translateY = 0;
      }, 300);
    }
  }
}

// 所有样式已移至dd-image.scss

// 导出初始化函数
export function initImageViewer() {
  if (typeof window !== "undefined") {
    new ImageViewer();
  }
}
