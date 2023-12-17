class Matrix {
  constructor(m, n, arr) {
    this.m = m;
    this.n = n;
    if (arr != null) {
      // arr が与えられていたら、arr で初期化する
      if (arr.length != m * n) {
        throw new Error('サイズの不一致');
      }
      this.matrix = [];
      for (let i = 0; i < m; i++) {
        this.matrix[i] = [];
        for (let j = 0; j < n; j++) {
          this.matrix[i][j] = arr[i + m * j];
        }
      }
    } else {
      this.matrix = [];
      for (let i = 0; i < m; i++) {
        this.matrix[i] = [];
        for (let j = 0; j < n; j++) {
          this.matrix[i][j] = 0;
        }
      }
    }
  }

  setValue(i, j, value) {
    if (i < 0 || i >= this.m || j < 0 || j >= this.n) {
      throw new Error('範囲外');
    }
    this.matrix[i][j] = value;
  }

  getValue(i, j) {
    if (i < 0 || i >= this.m || j < 0 || j >= this.n) {
      throw new Error('範囲外');
    }
    return this.matrix[i][j];
  }

  /**
   * この行列に mat を右から乗算したものを返す
   * @param mat
   * @returns この行列にmatを右から乗算した結果
   */
  mul(mat) {
    if (this.n != mat.m) {
      throw new Error('サイズの不一致');
    }
    const newMat = new Matrix(this.m, mat.n);
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < mat.n; j++) {
        let sum = 0;
        for (let k = 0; k < this.n; k++) {
          sum += this.getValue(i, k) * mat.getValue(k, j);
        }
        newMat.setValue(i, j, sum);
      }
    }
    return newMat;
  }

  toArray() {
    const arr = [];
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        arr[i + this.m * j] = this.getValue(i, j);
      }
    }
    return arr;
  }
}
