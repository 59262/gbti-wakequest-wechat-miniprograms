function wrapText(ctx, text, maxWidth, maxLines) {
  const chars = String(text || '').split('')
  const lines = []
  let line = ''

  chars.forEach((char) => {
    const testLine = line + char
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line)
      line = char
    } else {
      line = testLine
    }
  })

  if (line) lines.push(line)

  if (lines.length > maxLines) {
    const clipped = lines.slice(0, maxLines)
    clipped[maxLines - 1] = clipped[maxLines - 1].slice(0, -1) + '…'
    return clipped
  }

  return lines
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + width, y, x + width, y + height, radius)
  ctx.arcTo(x + width, y + height, x, y + height, radius)
  ctx.arcTo(x, y + height, x, y, radius)
  ctx.arcTo(x, y, x + width, y, radius)
  ctx.closePath()
}

function drawLowPolySpecies(ctx, result, x, y, size, imagePath) {
  const color = result.cardColor || '#5C8574'
  ctx.save()
  ctx.translate(x, y)
  if (imagePath) {
    ctx.drawImage(imagePath, -size * 0.58, -size * 0.58, size * 1.16, size * 1.16)
    ctx.restore()
    return
  }

  ctx.setFillStyle(color)
  ctx.setGlobalAlpha(0.18)
  roundRect(ctx, -size * 0.42, -size * 0.28, size * 0.84, size * 0.62, 42)
  ctx.fill()
  ctx.setGlobalAlpha(1)

  ctx.setFillStyle(color)
  ctx.beginPath()
  ctx.moveTo(0, -size * 0.43)
  ctx.lineTo(size * 0.38, -size * 0.08)
  ctx.lineTo(size * 0.28, size * 0.36)
  ctx.lineTo(-size * 0.26, size * 0.36)
  ctx.lineTo(-size * 0.38, -size * 0.08)
  ctx.closePath()
  ctx.fill()

  ctx.setFillStyle('rgba(255,255,255,0.56)')
  ctx.beginPath()
  ctx.moveTo(0, -size * 0.34)
  ctx.lineTo(size * 0.22, -size * 0.08)
  ctx.lineTo(0, size * 0.08)
  ctx.lineTo(-size * 0.18, -size * 0.08)
  ctx.closePath()
  ctx.fill()

  ctx.setFillStyle('#26312E')
  ctx.beginPath()
  ctx.arc(-size * 0.12, -size * 0.08, 7, 0, Math.PI * 2)
  ctx.arc(size * 0.12, -size * 0.08, 7, 0, Math.PI * 2)
  ctx.fill()

  ctx.setStrokeStyle('#26312E')
  ctx.setLineWidth(5)
  ctx.beginPath()
  ctx.arc(0, size * 0.04, size * 0.12, 0, Math.PI)
  ctx.stroke()
  ctx.restore()
}

function getTemplatePath(result) {
  const family = result.family || 'daily'
  const templateMap = {
    daily: '/assets/templates/template-daily-empty.png',
    food: '/assets/templates/template-food-empty.png',
    network: '/assets/templates/template-network-empty.png',
    nature: '/assets/templates/template-nature-empty.png',
    rare: '/assets/templates/template-rare-empty.png'
  }

  return templateMap[family] || templateMap.daily
}

function drawFallbackBackground(ctx, color) {
  const width = 1080
  const height = 1440

  ctx.setFillStyle('#FBF9F4')
  ctx.fillRect(0, 0, width, height)

  ctx.setFillStyle(color)
  ctx.setGlobalAlpha(0.14)
  ctx.beginPath()
  ctx.arc(920, 120, 280, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(90, 1260, 220, 0, Math.PI * 2)
  ctx.fill()
  ctx.setGlobalAlpha(1)

  roundRect(ctx, 72, 72, 936, 1296, 54)
  ctx.setFillStyle('#FFFFFF')
  ctx.fill()
}

function drawHiddenMark(ctx, result, x, y) {
  if (!result.hiddenMark) return

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(10 * Math.PI / 180)

  ctx.setFillStyle('rgba(231, 239, 234, 0.92)')
  ctx.beginPath()
  ctx.arc(0, 0, 88, 0, Math.PI * 2)
  ctx.fill()

  ctx.setStrokeStyle('rgba(102, 135, 119, 0.68)')
  ctx.setLineWidth(7)
  ctx.beginPath()
  ctx.arc(0, 0, 88, 0, Math.PI * 2)
  ctx.stroke()

  ctx.setStrokeStyle('rgba(102, 135, 119, 0.42)')
  ctx.setLineWidth(3)
  ctx.beginPath()
  ctx.arc(0, 0, 66, 0, Math.PI * 2)
  ctx.stroke()

  ctx.setFillStyle('#668777')
  ctx.setTextAlign('center')
  ctx.setFontSize(24)
  ctx.fillText(result.hiddenMark.serial, 0, -12)
  ctx.setFontSize(30)
  ctx.fillText(result.hiddenMark.label, 0, 30)
  ctx.setTextAlign('left')
  ctx.restore()
}

function drawShareCard(ctx, result, imagePath = '', templatePath = '') {
  const color = (result.theme && result.theme.primary) || result.cardColor || '#668777'

  if (templatePath) {
    ctx.drawImage(templatePath, 0, 0, 1080, 1440)
  } else {
    drawFallbackBackground(ctx, color)
  }

  ctx.setFontSize(30)
  ctx.setFillStyle('#68736F')
  ctx.fillText(result.rarity.isHidden ? 'RARE TYPE / 隐藏款' : 'GBTI TYPE RESULT', 118, 146)
  drawHiddenMark(ctx, result, 870, 238)

  ctx.setFillStyle(color)
  roundRect(ctx, 780, 110, 150, 56, 28)
  ctx.fill()
  ctx.setFillStyle('#FFFFFF')
  ctx.setFontSize(26)
  ctx.fillText(result.code, 808, 148)

  drawLowPolySpecies(ctx, result, 540, 380, 470, imagePath)

  ctx.setFillStyle('#26312E')
  ctx.setFontSize(result.name.length > 12 ? 52 : 60)
  wrapText(ctx, result.name, 820, 2).forEach((line, index) => {
    ctx.fillText(line, 118, 690 + index * 70)
  })

  ctx.setFillStyle('#68736F')
  ctx.setFontSize(30)
  ctx.fillText(result.category, 118, 820)

  ctx.setFillStyle('#26312E')
  ctx.setFontSize(38)
  wrapText(ctx, result.quote, 820, 3).forEach((line, index) => {
    ctx.fillText(line, 118, 900 + index * 56)
  })

  let tagX = 118
  const tagY = 1110
  ctx.setFontSize(28)
  result.cardTags.slice(0, 3).forEach((tag) => {
    const displayTag = tag.indexOf('#') === 0 ? tag : `#${tag}`
    const tagWidth = ctx.measureText(displayTag).width + 52
    ctx.setFillStyle(color)
    ctx.setGlobalAlpha(0.14)
    roundRect(ctx, tagX, tagY, tagWidth, 56, 28)
    ctx.fill()
    ctx.setGlobalAlpha(1)
    ctx.setFillStyle(color)
    ctx.fillText(displayTag, tagX + 26, tagY + 38)
    tagX += tagWidth + 18
  })

  ctx.setFillStyle('#26312E')
  ctx.setFontSize(30)
  ctx.fillText(`最配物种：${result.bestMatch.name} ${result.bestMatch.code}`, 118, 1248)

  ctx.setFillStyle('#9AA39F')
  ctx.setFontSize(24)
  ctx.fillText('人类异常分类报告 GBTI · 本测试仅供娱乐', 118, 1310)
}

function saveShareCard(canvasId, page, result) {
  return new Promise((resolve, reject) => {
    const render = (imagePath = '', templatePath = '') => {
      const ctx = wx.createCanvasContext(canvasId, page)
      drawShareCard(ctx, result, imagePath, templatePath)
      ctx.draw(false, () => {
        wx.canvasToTempFilePath({
          canvasId,
          width: 1080,
          height: 1440,
          destWidth: 1080,
          destHeight: 1440,
          success: ({ tempFilePath }) => {
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath,
              success: resolve,
              fail: reject
            })
          },
          fail: reject
        }, page)
      })
    }

    let characterPath = ''
    let templatePath = ''
    let pending = 0

    const done = () => {
      pending -= 1
      if (pending <= 0) render(characterPath, templatePath)
    }

    if (result.illustration) {
      pending += 1
      wx.getImageInfo({
        src: result.illustration,
        success: ({ path }) => {
          characterPath = path
          done()
        },
        fail: done
      })
    }

    pending += 1
    wx.getImageInfo({
      src: getTemplatePath(result),
      success: ({ path }) => {
        templatePath = path
        done()
      },
      fail: done
    })
  })
}

module.exports = {
  saveShareCard,
  drawShareCard
}
