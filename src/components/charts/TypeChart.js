import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const TypeChart = ({ chartData, personalityType }) => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

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
      // キャンバスを一度クリア
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
      // チャート作成に失敗した場合、fallback表示
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

  // 数値データ表示コンポーネント
  const ScoreTable = () => (
    <div style={{ 
      marginTop: '20px', 
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    }}>
      <h4 style={{ 
        fontSize: '16px', 
        fontWeight: 'bold', 
        marginBottom: '15px',
        color: '#333',
        textAlign: 'center'
      }}>
詳細スコア分析
      </h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {chartData.riasec.map((item, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            backgroundColor: '#fff',
            borderRadius: '6px',
            border: '1px solid #e9ecef'
          }}>
            <span style={{ 
              fontSize: '13px', 
              fontWeight: '500',
              color: '#495057'
            }}>
              {item.label}
            </span>
            <div style={{ textAlign: 'right' }}>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: 'bold',
                color: '#4a90e2'
              }}>
                {item.deviation || item.value}
              </div>
              <div style={{ 
                fontSize: '11px', 
                color: '#6c757d'
              }}>
                生スコア: {item.rawScore.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 行動スタイル表示 */}
      <h5 style={{ 
        fontSize: '14px', 
        fontWeight: 'bold', 
        marginTop: '20px',
        marginBottom: '10px',
        color: '#333'
      }}>
行動スタイル分析
      </h5>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {chartData.behavior.map((item, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '6px 10px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            border: '1px solid #e9ecef'
          }}>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: '500',
              color: '#495057'
            }}>
              {item.label}
            </span>
            <span style={{ 
              fontSize: '14px', 
              fontWeight: 'bold',
              color: '#28a745'
            }}>
              {item.deviation || item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      {/* チャート表示エリア */}
      <div style={{ 
        position: 'relative', 
        height: '400px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e9ecef'
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

      {/* 数値データ表示 */}
      {chartData && <ScoreTable />}

      {/* 理系向け解説 */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#e8f4fd',
        borderRadius: '8px',
        border: '1px solid #bee5eb'
      }}>
        <h4 style={{ 
          fontSize: '14px', 
          fontWeight: 'bold', 
          marginBottom: '10px',
          color: '#0c5460'
        }}>
分析手法について
        </h4>
        <ul style={{ 
          fontSize: '12px', 
          color: '#0c5460',
          marginLeft: '15px',
          lineHeight: '1.6'
        }}>
          <li>ホランドRIASEC理論に基づく6次元分析</li>
          <li>行動スタイル4分類との組み合わせによる精密診断</li>
          <li>偏差値（20-80）で相対的強度を表示（50が平均）</li>
          <li>生スコアで絶対的な傾向の強さを併記</li>
        </ul>
      </div>
    </div>
  );
};

export default TypeChart;