import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const TypeChart = ({ chartData, personalityType }) => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // 日本語化されたラベルマッピング
  const getJapaneseLabel = (englishLabel) => {
    const labelMap = {
      'Realistic': '現実的',
      'Investigative': '研究的', 
      'Artistic': '芸術的',
      'Social': '社会的',
      'Enterprising': '企業的',
      'Conventional': '慣習的',
      'Supporting': '支援型',
      'Controlling': '統制型',
      'Conserving': '保守型',
      'Adapting': '適応型'
    };
    return labelMap[englishLabel] || englishLabel;
  };

  useEffect(() => {
    if (!canvasRef.current || !chartData) return;

    const canvas = canvasRef.current;
    const canvasId = canvas.id;

    // 既存のチャートを確実に破棄
    if (chartInstanceRef.current) {
      try {
        chartInstanceRef.current.destroy();
      } catch (e) {
        console.warn('Chart destroy error:', e);
      }
      chartInstanceRef.current = null;
    }

    // Chart.jsグローバルレジストリから既存インスタンスをクリア
    if (canvasId) {
      const existingChart = Chart.getChart(canvasId);
      if (existingChart) {
        try {
          existingChart.destroy();
        } catch (e) {
          console.warn('Existing chart destroy error:', e);
        }
      }
    }

    const ctx = canvas.getContext('2d');
    
    // キャンバスのコンテキストをリセット
    try {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } catch (e) {
      console.warn('Canvas clear error:', e);
    }
    
    // レーダーチャートの設定
    let newChart;
    try {
      newChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: [
            '現実的\n(技術・実務)',
            '研究的\n(分析・探究)', 
            '芸術的\n(創造・表現)',
            '社会的\n(人間関係)',
            '企業的\n(リーダー)',
            '慣習的\n(秩序・管理)'
          ],
          datasets: [
            {
              label: '診断結果',
              data: chartData.riasec.map(item => item.value),
              backgroundColor: 'rgba(74, 144, 226, 0.2)',
              borderColor: 'rgba(74, 144, 226, 1)',
              borderWidth: 3,
              pointBackgroundColor: 'rgba(74, 144, 226, 1)',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: `${personalityType.typeData.label} - 特性分析チャート`,
              font: {
                size: 18,
                weight: 'bold'
              },
              color: '#333',
              padding: 20
            },
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: 'rgba(74, 144, 226, 1)',
              borderWidth: 1,
              callbacks: {
                label: function(context) {
                  const dataPoint = chartData.riasec[context.dataIndex];
                  const rawScore = dataPoint.rawScore;
                  const deviation = dataPoint.deviation;
                  return `偏差値: ${deviation} (生スコア: ${rawScore.toFixed(2)})`;
                }
              }
            }
          },
          scales: {
            r: {
              beginAtZero: false,
              max: 80,
              min: 20,
              ticks: {
                stepSize: 10,
                showLabelBackdrop: false,
                color: '#666',
                font: {
                  size: 12
                },
                callback: function(value) {
                  return value;
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              angleLines: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              pointLabels: {
                font: {
                  size: 12,
                  weight: 'bold'
                },
                color: '#333'
              }
            }
          },
          interaction: {
            intersect: false
          }
        }
      });
      
      chartInstanceRef.current = newChart;
    } catch (error) {
      console.error('Chart creation failed:', error);
      chartInstanceRef.current = null;
    }

    return () => {
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.destroy();
        } catch (e) {
          console.warn('Cleanup destroy error:', e);
        }
        chartInstanceRef.current = null;
      }
    };
  }, [chartData, personalityType?.typeData?.label]);

  // コンポーネントアンマウント時の追加クリーンアップ
  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.destroy();
        } catch (e) {
          console.warn('Component unmount cleanup error:', e);
        }
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {/* チャートとスコアの2列レイアウト */}
      <div className="grid_2-col gap-large" style={{ 
        marginBottom: 'var(--spacing-lg)',
        '@media (max-width: 767px)': {
          gridTemplateColumns: '1fr',
          gap: 'var(--spacing-md)'
        }
      }}>
        {/* 左側：チャート表示エリア */}
        <div style={{ 
          position: 'relative', 
          height: '400px',
          backgroundColor: 'var(--neutral-primary)',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef',
          '@media (max-width: 767px)': {
            height: '300px',
            padding: '12px'
          }
        }}>
          <canvas 
            ref={canvasRef}
            id={`chart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`}
            width="400"
            height="300"
          ></canvas>
          
          {/* Chart.js読み込み失敗時のfallback */}
          {!chartData && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: '#666'
            }}>
              <div>チャート</div>
              <div style={{ marginTop: '8px', fontSize: '14px' }}>
                チャートを読み込み中...
              </div>
            </div>
          )}
        </div>

        {/* 右側：数値データ表示 */}
        {chartData && (
          <div style={{ 
            padding: '16px',
            backgroundColor: 'var(--neutral-primary)',
            borderRadius: '12px',
            border: '1px solid #e9ecef',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            height: '400px',
            overflowY: 'auto',
            '@media (max-width: 767px)': {
              height: '300px',
              padding: '12px'
            }
          }}>
            <h4 style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              marginBottom: '12px',
              color: '#333',
              textAlign: 'center'
            }}>
              詳細スコア分析
            </h4>
            
            {/* 偏差値の説明 */}
            <div style={{
              backgroundColor: '#e8f4fd',
              padding: '8px',
              borderRadius: '4px',
              marginBottom: '12px',
              border: '1px solid #bee5eb'
            }}>
              <p style={{
                fontSize: '10px',
                color: '#0c5460',
                margin: 0,
                textAlign: 'center'
              }}>
                偏差値50が平均、60以上が高い、40以下が低い
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {chartData.riasec.map((item, index) => {
                const deviation = item.deviation || item.value;
                const isHigh = deviation >= 60;
                const isLow = deviation <= 40;
                
                return (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 10px',
                    backgroundColor: isHigh ? '#d4edda' : isLow ? '#f8d7da' : '#f8f9fa',
                    borderRadius: '4px',
                    border: `1px solid ${isHigh ? '#c3e6cb' : isLow ? '#f5c6cb' : '#e9ecef'}`
                  }}>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '500',
                      color: '#333'
                    }}>
                      {getJapaneseLabel(item.label)}
                    </span>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: 'bold',
                        color: isHigh ? '#155724' : isLow ? '#721c24' : '#4a90e2'
                      }}>
                        {deviation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 行動スタイル表示 */}
            <h5 style={{ 
              fontSize: '12px', 
              fontWeight: 'bold', 
              marginTop: '16px',
              marginBottom: '8px',
              color: '#333'
            }}>
              行動スタイル分析
            </h5>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {chartData.behavior.map((item, index) => {
                const deviation = item.deviation || item.value;
                const isHigh = deviation >= 60;
                const isLow = deviation <= 40;
                
                return (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 8px',
                    backgroundColor: isHigh ? '#d1ecf1' : isLow ? '#f8d7da' : '#f8f9fa',
                    borderRadius: '4px',
                    border: `1px solid ${isHigh ? '#bee5eb' : isLow ? '#f5c6cb' : '#e9ecef'}`
                  }}>
                    <span style={{ 
                      fontSize: '10px', 
                      fontWeight: '500',
                      color: '#333'
                    }}>
                      {getJapaneseLabel(item.label)}
                    </span>
                    <span style={{ 
                      fontSize: '12px', 
                      fontWeight: 'bold',
                      color: isHigh ? '#0c5460' : isLow ? '#721c24' : '#28a745'
                    }}>
                      {deviation}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 分析手法の説明 - レギュレーション準拠の色に変更 */}
      <div style={{
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid var(--neutral-200)'
      }}>
        <h4 style={{ 
          fontSize: '14px', 
          fontWeight: 'bold', 
          marginBottom: '10px',
          color: '#333333'
        }}>
          分析手法について
        </h4>
        <ul style={{ 
          fontSize: '12px', 
          color: '#495057',
          marginLeft: '15px',
          lineHeight: '1.6'
        }}>
          <li>ホランド職業興味理論に基づく6次元分析</li>
          <li>行動スタイル4分類との組み合わせによる精密診断</li>
          <li>偏差値（20-80）で相対的強度を表示（50が平均）</li>
          <li>生スコアで絶対的な傾向の強さを併記</li>
        </ul>
      </div>
    </div>
  );
};

export default TypeChart;