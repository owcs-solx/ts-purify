import { cleanAllFiles, watchSourceAndCleanDest, Options } from '.'

async function doMain(): Promise<void> {
  const args = process.argv
  let watch = false
  let srcDir = 'src'
  let destDir = 'dist'
  const options: Options = {}

  for (let i = 2; i < args.length; ++i) {
    const arg = args[i]
    if (arg === '-w' || arg === '--watch') {
      watch = true
    } else if (arg === '-v' || arg === '--verbose') {
      options.verbose = true
    } else if (arg === '-s' || arg === '--source') {
      srcDir = args[++i]
    } else if (arg === '-d' || arg === '--dest') {
      destDir = args[++i]
    } else if (arg === '-w' || arg === '--watch-project') {
      options.watchProject = true
    } else if (arg === '-h' || arg === '--help') {
      console.log(args[1] + ' [-h] [-v] [-s <dir>] [-d <dir]')
      process.exit(0)
    } else {
      throw new Error(`Unknown arg: ${arg}`)
    }
  }

  await cleanAllFiles(srcDir, destDir, options)
  if (watch) {
    await watchSourceAndCleanDest(srcDir, destDir, options)
  }
}

export async function main(): Promise<void> {
  try {
    // await to ensure exceptions are propagated
    await doMain()
  } catch (e) {
    console.error(typeof e === 'string' ? e : e.message)
    process.exit(1)
  }
}
