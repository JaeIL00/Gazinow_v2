#import "Firebase.h"
#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import "RNCConfig.h"
#import "RNSplashScreen.h"
#import <React/RCTLinkingManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"gazinow";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  bool didFinish = [super application:application didFinishLaunchingWithOptions:launchOptions];
  
  [FIRApp configure]; // 파이어베이스 초기화
  
  [RNSplashScreen show];  // this needs to be called after [super application:application didFinishLaunchingWithOptions:launchOptions];
  
  return didFinish;
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

NSDictionary *config = [RNCConfig env];

@end
