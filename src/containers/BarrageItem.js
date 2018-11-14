class BarrageItem {
    constructor(
        ctx,
        {
            text = '',
            time = 0,
            fontSize = '12px',
            fontFamily = 'Arial',
            color = '#000000',
            opacity = 1,
            speed = 10,
        },
    ) {
        this.ctx = ctx;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.color = color;
        this.opacity = opacity;
        this.speed = speed;
        this.text = text;
        this.time = time;

        this.hasShowed = false; //是否渲染过
        this.hasInit = false; //是否初始化，保证只初始化一次
    }
    getBarrageWidth() {
        // 获取弹幕宽度
        const p = document.createElement('p');
        p.style.display = 'inline-block';
        p.innerHTML = this.text;
        p.style.fontSize = this.fontSize;
        p.style.opacity = 0;
        document.body.appendChild(p);
        const width = p.clientWidth;
        document.body.removeChild(p);
        return width;
    }
    init() {
        this.hasInit = true;
        const fontSizeNum = this.fontSize.replace('px', '') - 0;
        const ctx = this.ctx;
        this.width = this.getBarrageWidth();
        this.x = ctx.canvas.width; //弹幕出现的x轴位置
        this.y = ctx.canvas.height * Math.random(); //弹幕出现的y轴位置，随机
        // 临界处理
        if (this.y < fontSizeNum) this.y = fontSizeNum;
        if (this.y > ctx.canvas.height) this.y = ctx.height - fontSizeNum;
    }
    render() {
        // 渲染当前弹幕
        const ctx = this.ctx;
        // 设置字体
        ctx.font = `${this.fontSize} ${this.fontFamily}`;
        // 设置颜色
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }
}

export default BarrageItem;
